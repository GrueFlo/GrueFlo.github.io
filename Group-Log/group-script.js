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
    if (
      (timestamp === '9:00 - 12:00' || timestamp === '14:00 - 17:00') &&
      event.target.classList.contains('droppable-column')
    ) {
      const originalColor = window.getComputedStyle(draggableElement).backgroundColor;
      event.target.appendChild(draggableElement);
      draggableElement.removeAttribute('draggable');
      draggableElement.classList.remove('backlog-box');
      draggableElement.classList.add('dropped-box');
      draggableElement.style.backgroundColor = originalColor;
    }
  }
  