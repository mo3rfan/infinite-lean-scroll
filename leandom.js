// Twitter tweets
const targetNode = document.querySelector('#stream-items-id');

var intersection_cb = function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.remove();
    }
  });
}

var intersection_observer = new IntersectionObserver(window.requestIdleCallback((entries, obs) => { 
  intersection_cb(entries, obs);
}), { rootMargin: "150%" });

// Add intersection observer to existing elements on page
for (let node of targetNode.children) {
  if (node.nodeName == "LI") {
    intersection_observer.observe(node);
  }
}

var config = { childList: true };
var callback = function(mutationsList) {
  for(var mutation of mutationsList) {
      if (mutation.type == 'childList') {
        if (mutation.addedNodes.length > 0) {
          for (let node of mutation.addedNodes) {
            if (node.nodeName == "LI") {
              intersection_observer.observe(node);
            }
          }
        }
      }
  }
}
var observer = new MutationObserver(callback);
observer.observe(targetNode, config);
