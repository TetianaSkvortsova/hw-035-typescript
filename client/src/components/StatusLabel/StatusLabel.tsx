import './StatusLabel.scss';
import {STATUSES} from "../../common/status.js";
import type {TTask} from "../../types/types.ts";

type StatusLabelProps = Pick<TTask, 'status'>;

export default function StatusLabel({status}: StatusLabelProps) {

    return (
        <span className={`TaskStatus TaskStatus--${status}`}>
            {STATUSES[status]}
        </span>
    );
}