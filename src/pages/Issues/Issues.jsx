import React, { useEffect, useState, useId } from "react";
import Issue from "./Issue/Issue";
import { useSelector } from "react-redux";
import { deleteIssue, retrieveIssueFromProperty, retrieveIssues, updateIssue } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from "sweetalert2";

const Issues = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userType = useSelector((state) => state.users.userType);
    const [columns, setColumns] = useState([]);
    const [issues, setIssues] = useState([]);
    const [status, setStatus] = useState([]);
    const params = useParams();
    const requestedId = useId();
    const inProgressId = useId();
    const doneId = useId();
    useEffect(() => {
        const issuesPromise =
            userType === "Tenant"
                ? retrieveIssues(isLoggedIn)
                : retrieveIssueFromProperty(params.propertyId);
        issuesPromise
            .then((res) => {
                setIssues(res.data);
                const requestedIssues = res.data.filter(issue => issue.status === "Requested");
                const inProgressIssues = res.data.filter(issue => issue.status === "In Progress");
                const doneIssues = res.data.filter(issue => issue.status === "Done");
                const columnsFromBackend = {
                    [requestedId]: {
                        name: "Requested",
                        items: requestedIssues,
                    },
                    [inProgressId]: {
                        name: "In Progress",
                        items: inProgressIssues,
                    },
                    [doneId]: {
                        name: "Done",
                        items: doneIssues,
                    },
                };
                setColumns(columnsFromBackend);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [status]);

    const editIssue = (issueId) => {
        navigate(`/editIssue/${isLoggedIn}/${issueId}`);
    };

    const updateStatus = (issueId, issue) => {
        updateIssue(issueId, issue).then(r => {
            setStatus(r.data)
        })
    };

    const removeIssue = (issueId) => {
        deleteIssue(isLoggedIn, issueId)
            .then((r) => {
                setIssues(issues.filter(issue => issue._id !== issueId));
                setStatus(r.data)
                Swal.fire("Issue Deleted", `The issue has been deleted`, "success");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            const issue = { ...removed, status: destColumn.name };
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            updateStatus(issue._id, issue);
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    //Kanban Board Layout
    return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: "82vh"
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item._id}
                                                            draggableId={item._id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            marginBottom: "10px",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        <Issue issue={item} editIssue={editIssue} removeIssue={removeIssue} updateStatus={updateStatus}/>
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
};

export default Issues;