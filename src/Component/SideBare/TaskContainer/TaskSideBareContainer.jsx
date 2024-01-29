import BallCanvas from "../../Canvas/Ball";
import './TaskSideBareContainer.css';

const TaskSideBareContainer = ({ index, setType, task, currentTask }) => {
    const { taskStatus, taskNumber, taskIcon } = task;
    // Utilisez index correctement dans la comparaison
    const customClass = currentTask === index ? 'current-container' : '';

    return (
        <div onClick={() => setType(index)} className={`page-left-task-container ${customClass}`}>
            <div className="task-ball">
                <BallCanvas icon={taskIcon} />
            </div>
            <span className="task-status">{taskStatus}</span>
            <span className="task-number">{taskNumber}</span>
        </div>
    );
};


export default TaskSideBareContainer;