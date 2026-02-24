1) Difference between getElementById, getElementsByClassName, querySelector, and querySelectorAll
Answer:
a) getElementById() is used to select a single element by its unique ID. Since an ID should be unique in a webpage, this method always returns only one element or null if not found.
b) getElementsByClassName() selects all elements that share the same class name. It returns a live HTMLCollection, which means if the DOM changes, the collection updates automatically.
c) querySelector() selects the first element that matches a given CSS selector. It is more flexible because it works with any valid CSS selector like class, id, tag, or combinations.
d) querySelectorAll() selects all elements that match a CSS selector. It returns a static NodeList, meaning it does not automatically update when the DOM changes.

2) How to create and insert a new element into the DOM ?
Answer: To create a new element in JavaScript, we use the document.createElement() method. After creating the element, we can add text, attributes, or class names to it.Once the element is ready, we insert it into the DOM using methods like appendChild(), append(), or prepend().
This process allows us to dynamically update or modify the structure and content of a webpage.

3) What is Event Bubbling? How does it work?
Answer: Event bubbling is a process where an event starts from the target element and then moves upward through its parent elements in the DOM tree. For example, if a button inside a div is clicked, the event first runs on the button, then on the div, then on the body, and continues upward until it reaches the document.
This happens automatically unless we stop it using event.stopPropagation().

4) What is Event Delegation? Why is it useful?
Answer: Event delegation is a technique where we attach a single event listener to a parent element instead of adding separate listeners to multiple child elements. Because of event bubbling, the parent can detect events triggered by its child elements.
It is useful because:
It improves performance fewer event listeners
It works with dynamically added elements
It keeps the code cleaner and easier to manage

5) Difference between preventDefault() and stopPropagation() 
Answer: preventDefault() stops the default browser behavior of an event. For example, it can prevent a form from submitting or stop a link from navigating. stopPropagation() stops the event from moving up or down the DOM tree. It prevents parent elements from receiving the same event.
