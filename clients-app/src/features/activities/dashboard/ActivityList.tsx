import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {selectActivity, deleteActivity, loading, activitiesByDate} = activityStore;
    const [target, setTarget] = useState("");
    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string): void {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button name={activity.id} onClick={(e) => handleDelete(e, activity.id)} floated="right" content="Delete" color="red" loading={loading && target===activity.id} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})