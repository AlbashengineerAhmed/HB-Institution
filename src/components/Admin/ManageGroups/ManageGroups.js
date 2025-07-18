import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // fetchGroups, // COMMENTED OUT - Not available yet
  // deleteGroup, // COMMENTED OUT - Not available yet
  setSearchTerm,
  setSelectedCourse,
  setSelectedInstructor,
  filterGroups,
  clearFilters,
  clearError
} from '../../../store/slices/groupSlice';
import { fetchCourses } from '../../../store/slices/courseSlice';
import GroupForm from './GroupForm';
import styles from './ManageGroups.module.css';

const ManageGroups = () => {
  const dispatch = useDispatch();
  const {
    filteredGroups,
    instructors,
    isLoading,
    error,
    searchTerm,
    selectedCourse,
    selectedInstructor
  } = useSelector((state) => state.groups);
  const { courses } = useSelector((state) => state.courses);

  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    // COMMENTED OUT - Group fetching not available yet
    // dispatch(fetchGroups());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterGroups());
  }, [dispatch, searchTerm, selectedCourse, selectedInstructor]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCourseFilter = (e) => {
    dispatch(setSelectedCourse(e.target.value));
  };

  const handleInstructorFilter = (e) => {
    dispatch(setSelectedInstructor(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleAddGroup = () => {
    setEditingGroup(null);
    setShowForm(true);
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setShowForm(true);
  };

  // COMMENTED OUT - Delete functionality not available yet
  // const handleDeleteGroup = async (groupId) => {
  //   if (window.confirm('Are you sure you want to delete this group?')) {
  //     await dispatch(deleteGroup(groupId));
  //     dispatch(fetchGroups());
  //   }
  // };

  const handleFormSuccess = () => {
    // COMMENTED OUT - Will refresh groups when fetch is available
    // dispatch(fetchGroups());
    console.log('Group created/updated successfully');
  };

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  const getInstructorName = (instructorId) => {
    const instructor = instructors.find(i => i._id === instructorId);
    return instructor ? `${instructor.firstName} ${instructor.lastName}` : 'Unknown Instructor';
  };

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={() => dispatch(clearError())}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.manageGroups}>
      <div className={styles.header}>
        <h2>Manage Groups</h2>
        <button className={styles.addButton} onClick={handleAddGroup}>
          + Add Group
        </button>
      </div>

      {/* Info Message */}
      <div className={styles.infoMessage}>
        <p>
          <strong>Note:</strong> Group creation and editing are available. 
          Group listing and deletion will be enabled when the API endpoints are ready.
        </p>
      </div>

      {/* Filters - Commented out until fetch is available */}
      {/* <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search groups by code or level..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterSelects}>
          <select
            value={selectedCourse}
            onChange={handleCourseFilter}
            className={styles.filterSelect}
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>

          <select
            value={selectedInstructor}
            onChange={handleInstructorFilter}
            className={styles.filterSelect}
          >
            <option value="all">All Instructors</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.firstName} {instructor.lastName}
              </option>
            ))}
          </select>

          <button onClick={handleClearFilters} className={styles.clearFilters}>
            Clear Filters
          </button>
        </div>
      </div> */}

      {/* Groups List - Commented out until fetch is available */}
      <div className={styles.groupsList}>
        {isLoading ? (
          <div className={styles.loading}>Loading groups...</div>
        ) : (
          <div className={styles.noGroupsMessage}>
            <div className={styles.noGroupsIcon}>👥</div>
            <h3>Group Management</h3>
            <p>Create and manage course groups using the "Add Group" button above.</p>
            <p>Group listing will be available once the fetch API endpoints are implemented.</p>
            <button className={styles.createFirstButton} onClick={handleAddGroup}>
              Create Your First Group
            </button>
          </div>
        )}
      </div>

      {/* Commented out group display until fetch is available */}
      {/* {filteredGroups.length === 0 ? (
          <div className={styles.noGroups}>
            <p>No groups found.</p>
          </div>
        ) : (
          <div className={styles.groupsGrid}>
            {filteredGroups.map((group) => (
              <div key={group._id} className={styles.groupCard}>
                <div className={styles.groupHeader}>
                  <h3 className={styles.groupCode}>{group.code}</h3>
                  <div className={styles.groupActions}>
                    <button
                      onClick={() => handleEditGroup(group)}
                      className={styles.editButton}
                      title="Edit Group"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group._id)}
                      className={styles.deleteButton}
                      title="Delete Group"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className={styles.groupInfo}>
                  <p><strong>Course:</strong> {getCourseTitle(group.courseId)}</p>
                  <p><strong>Instructor:</strong> {getInstructorName(group.instructorId)}</p>
                  <p><strong>Level:</strong> {group.level}</p>
                  <p><strong>Max Students:</strong> {group.maxStudents}</p>
                </div>

                <div className={styles.groupSchedule}>
                  <h4>Schedule:</h4>
                  {group.schedule?.map((slot, index) => (
                    <div key={index} className={styles.scheduleSlot}>
                      <span>{slot.dayOfWeek}</span>
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )} */}

      {/* Group Form Modal */}
      <GroupForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        editingGroup={editingGroup}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default ManageGroups;