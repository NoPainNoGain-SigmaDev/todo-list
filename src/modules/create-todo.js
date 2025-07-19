export function createTodo({
  title = "New ToDo",
  description = "",
  dueDate = "",
  priority = "low",
  location = "",
}) {
  let completed = false;

  //crypto.randomUUID() does not work on iphone
  function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const id = crypto.randomUUID ? crypto.randomUUID() : generateUUID();
  const checklist = [];

  const getTitle = () => title;
  const updateTitle = (newTitle) => (title = newTitle);
  const getDescription = () => description;
  const updateDescription = (newDescription) => (description = newDescription);
  const getChecklist = () => checklist;
  const addToChecklist = (newChecklistItem) => checklist.push(newChecklistItem);
  const removeChecklistItem = (index) => {
    checklist.splice(index, 1);
  };
  const getDueDate = () => dueDate;
  const updateDueDate = (newDate) => (dueDate = newDate);
  const getPriority = () => priority;
  const updatePriority = (newPriority) => (priority = newPriority);
  const getId = () => id;
  const isCompleted = () => completed;
  const updateStatus = () => (completed = !isCompleted());
  const getLocation = () => location;
  const updateLocation = (newLocation) => (location = newLocation);

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
