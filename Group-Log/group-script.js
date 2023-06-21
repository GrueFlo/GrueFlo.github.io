function allowDrop(event) {
    event.preventDefault();
    event.target.classList.add('highlight');
  }
  
  function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  function drop(event) {
    event.preventDefault();
    event.target.classList.remove('highlight');
  
    const data = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(data);
  
    // Check if the drop is allowed in the specified slots
    const timestamp = event.target.parentNode.querySelector('.timestamp').textContent;
    const isDropAllowed = timestamp === '9:00 - 12:00' || timestamp === '14:00 - 17:00';
    const isTargetColumn = event.target.classList.contains('droppable-column') || event.target.classList.contains('backlog-column');
  
    if (isDropAllowed && isTargetColumn) {
      event.target.appendChild(draggableElement);
      draggableElement.setAttribute('draggable', 'true');
      draggableElement.classList.remove('dropped-box');
      draggableElement.classList.add('backlog-box');
      draggableElement.style.backgroundColor = '';
    }
  }
  