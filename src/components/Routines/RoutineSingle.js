import { useMutation, useQueryClient } from "react-query";
import RoutineActivity from "./RoutineActivity";
import { callApi } from "../../api";
import "./RoutineSingle.css";

const RoutineSingle = ({
  routine,
  setShowForm,
  setEditFields,
  editable,
  token,
  setType,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(callApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUserRoutines");
    },
  });

  const handleEdit = () => {
    setShowForm(true);
    setEditFields({
      id: routine.id,
      name: routine.name,
      goal: routine.goal,
      isPublic: routine.isPublic,
    });
  };

  const handleRoutineActivity = () => {
    setShowForm(true);
    setType("activity");
    setEditFields({
      routineId: routine.id,
      name: routine.name,
      goal: routine.goal,
      isPublic: routine.isPublic,
    });
  };

  const handleDelete = async (routineId, token) => {
    try {
      mutate({
        url: `/routines/${routineId}`,
        method: "delete",
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="routine-card">
        <div className="routine-name">{routine.name}</div>
        <div className="username">Created by {routine.creatorName}</div>
        <div className="description">Goal: {routine.goal}</div>
        {routine.activities && routine.activities.length
          ? routine.activities.map((activity) => {
              return (
                <RoutineActivity
                  key={activity.id}
                  activity={activity}
                  editable={editable}
                  setShowForm={setShowForm}
                  setEditFields={setEditFields}
                  setType={setType}
                />
              );
            })
          : null}
        {editable ? (
          <section>
            <button
              className="add-routine-activity"
              onClick={handleRoutineActivity}
            >
              Add A Routine Activity +
            </button>
            <div className="buttons-container">
              <button
                className="edit-activity-card-button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="delete-routine-card-button"
                onClick={() => {
                  handleDelete(routine.id, token);
                }}
              >
                Delete
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default RoutineSingle;
