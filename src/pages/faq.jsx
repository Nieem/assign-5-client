import React from 'react';

const Faqpage = () => {
    return (
    <div className=" container justify-center my-3">  
 <div className="join join-vertical w-full px-5 my-20">
  <h3 className='text-center font-bold text-3xl mb-3'>Frequenly Asked Questions</h3>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">What is React.js and Explain the concept of "components" in React.</div>
    <div className="collapse-content">
      <p>React is a JavaScript library created by Facebook
           React is a User Interface (UI) library React is a tool for building UI components</p>
           <p>React. js, more commonly known as React, is a free, open-source JavaScript library. It works best to build user interfaces by combining sections of code (components) into full websites. Originally built by Facebook, Meta and the open-source community now maintain it.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">What is JSX in React, and how does it work?</div>
    <div className="collapse-content">
      <p>JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods. JSX converts HTML tags into react elements. You are not required to use JSX, but JSX makes it easier to write React applications.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">What is the Virtual DOM, and how does React use it to optimize performance?</div>
    <div className="collapse-content">
      <p>he VDOM is a lightweight, in-memory copy of the real DOM that React uses to track changes to the user interface (UI)</p>
    <p>When a React component's state or props change, React updates the VDOM first, then compares it to the old VDOM to identify differences. React then calculates the most efficient way to update the real DOM to match the new VDOM</p>
    </div>
  </div>

  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Explain the concept of "props" in React and how they are used.</div>
    <div className="collapse-content">
      <p>Props is a special keyword in React that stands for properties and is used for passing data from one component to another. Data with props are passed in a unidirectional flow from parent to child.</p>
    </div>
  </div>

  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">What is "state" in React, and how does it differ from props?</div>
    <div className="collapse-content">
      <p>State refers to the internal data of a component that can change over time, while props are used to pass data between components. </p>
    </div>
  </div>

  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Explain the useState hook and provide an example of how it is used.</div>
    <div className="collapse-content">
    <p>useState is React Hook that allows you to add state to a functional component. It returns an array with two values: the current state and a function to update it. The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.</p>
    </div>
  </div>
  

  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">What is the purpose of the useEffect hook in React, and when would you use it?</div>
    <div className="collapse-content">
      <p>The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional.</p>
    </div>
  </div>
  
    
</div>
        </div>
    );
};

export default Faqpage;