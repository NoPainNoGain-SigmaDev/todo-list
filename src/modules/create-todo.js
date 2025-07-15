export function createTodo(
  {title = "New ToDo",
  description = "",
  dueDate = "today",
  location = 0,
  }
) {
  let completed = false;
  let priority = "low";
  const id = crypto.randomUUID();
  const checklist = [];

  const getTitle = () => title;
  const updateTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const updateDescription = (newDescription) => (description = newDescription);
  const getChecklist = () => checklist;
  const addToChecklist = (newChecklistItem) => checklist.push(newChecklistItem);
  const removeChecklistItem = (index) => { checklist.splice(index, 1) };
  const getDueDate = () => dueDate;
  const updateDueDate = (newDate) => (dueDate = newDate);
  const getPriority = () => priority;
  const updatePriority = (newPriority) => (priority = newPriority);
  const getId = () => id;
  const isCompleted = () => completed;
  const updateStatus = () => (completed = !isCompleted());
  const getLocation = () => location;
  const updateLocation = (newLocation) => location = newLocation;

  return {
    getTitle,
    updateTitle,
    getDescription,
    updateDescription,
    getChecklist,
    addToChecklist,
    removeChecklistItem,
    getDueDate,
    updateDueDate,
    getPriority,
    updatePriority,
    getId,
    isCompleted,
    updateStatus,
    getLocation,
    updateLocation,
  };
}
