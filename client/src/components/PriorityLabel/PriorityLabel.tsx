import './PriorityLabel.scss'

type PriorityLabelProps = {
    priority: string
}

export default function PriorityLabel({priority}:PriorityLabelProps) {
    return (
        <strong className={'PriorityLabel_'+priority}>{priority}</strong>
    )
}