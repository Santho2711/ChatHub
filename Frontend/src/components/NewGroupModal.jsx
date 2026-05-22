import React, { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import "../styles/NewGroupModal.css";

const NewGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { createGroup } = useChatStore();
  const users = (useAuthStore((state) => state.users) || []).map((user) => ({
    ...user,
    id: user.id || user._id,
  }));

  const filteredUsers = users.filter((user) =>
    [user.name, user.email]
      .join(" ")
      .toLowerCase()
      .includes(memberSearch.toLowerCase()),
  );

  const handleMemberToggle = (member) => {
    setSelectedMembers((prev) =>
      prev.some((item) => item.id === member.id)
        ? prev.filter((item) => item.id !== member.id)
        : [...prev, member],
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert("Please enter a group name and select at least one member");
      return;
    }

    const memberIds = selectedMembers.map((member) => member.id);
    await createGroup(groupName, memberIds);
    onClose();
  };

  return (
    <div className="new-group-modal-overlay" onClick={onClose}>
      <div className="new-group-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Group</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="form-group">
            <label htmlFor="group-name">Group Name</label>
            <input
              id="group-name"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="member-search">Search Members</label>
            <input
              id="member-search"
              type="text"
              placeholder="Search users by name or email"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Select Members</label>
            <div className="members-list">
              {filteredUsers.map((member) => (
                <div key={member.id} className="member-option">
                  <input
                    type="checkbox"
                    id={member.id}
                    checked={selectedMembers.some(
                      (item) => item.id === member.id,
                    )}
                    onChange={() => handleMemberToggle(member)}
                  />
                  <label htmlFor={member.id}>{member.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="selected-members">
            <p className="members-count">Selected: {selectedMembers.length}</p>
            <div className="members-tags">
              {selectedMembers.map((member) => (
                <span key={member.id} className="member-tag">
                  {member.name}
                  <button onClick={() => handleMemberToggle(member)}>✕</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="create-button"
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedMembers.length === 0}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroupModal;
