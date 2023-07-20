1. What is the difference between Component and PureComponent? Give an example where it might break my app.
   => Firstly, we need to understand what makes a component rerender. So, every time that a prop or local state changes will rerender the component, and the same happens if its parent rerenders for the same reason, in other words, every time a parent component changes its children will rerender, doesn't matter if one of its children uses the props changed or not.
   Now we can talk about the difference between Component and PureComponent. The rerendering behavior of a component is what I explained before. However, in a PureComponent, the rerendering is caused only if its props or local state changes.
   But why this happen? Actually, the PureComponent does a Shallow comparison on their props an with the memoized props' values, if its parent changes because one of its state/props that is not been use used by a PureComponent it will not rerender, but a normal Component will.
   To create a PureComponent, you need to extends the PureComponent provided by React:
   import React from 'react';

   **Class based Components**

   - PureComponent:

```
 class MyPureComponent extends React.PureComponent {
    render(...) {
      return {/_ JSX content _/}
    }
 }
 export default MyPureComponent;
```

- Component:

```
   class MyComponent extends React.Component {
      render(...) {
        return {/_ JSX content _/}
      }
   }
   export default MyComponent;
```

**Functional based Components**
To create a PureComponent using hook, we have two main ways:

- Use the React.memo HOC: This HOC does the same shallow copying of a class based PureComponent, or the hook useMemo/useCallback in the Parent.

1.  Fist:

```
  const MyFunctionalPureComponent =({...}) =>(
     {...}
     )
   export default React.memo(MyFunctionalPureComponent)
```

2. Second:

```
const MyFunctionalParentComponent =({...}) =>{
const[state, setState] = React.useState(false)

    const memoizedState = React.useMemo(()=> state,[...deps])

    const handleClick = useCallback((param)=>{
    if(param){
      setState(true)
    }

},[...deps])

}

return(
<MyFunctionalPureComponent state={memoizedState} handleClick={handleClick} >
)

export default React.memo(MyFunctionalPureComponent)

```

=> Backing to the question, what makes my app break?? A shallow copy only works when the props are primitive types (strings, numbers, booleans, Symbols, etc), with objects (array, objects, functions) it doesn't work, because they are reference types.
So, {name: "Pedro"} === {name: "Pedro"} = false, because every time we create a reference type we are just pointing to another memory location.
Now, with this information in mind, we realize that we can create several issues in our App, since small blockings on the UI or really brake the component, if this component is rendering a large data, like a table or list for example. Rerendering these components unnecessarily, several times is dangerous!

But the good news is that the React.memo HOC provides a second argument, a function with the previousProps and nextProps as parameters and returns a boolean value, that way we can compare the reference types, preventing unnecessary rerenders!

---

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
   => Let's start with ShouldComponentUpdate, it a life cycle method used in class components. Its usage is to determine when the component should or not rerender, it uses the previous and nextProps as parameters and returns a boolean value. The dangerous part is caused by a wrong implementation, where it should return true and it returns false instead, it will cause inconsistencies in the UI, otherwise, it can cause unnecessary rendering. The solution for class components is to use a PureComponent or memo for functional components, both automatically implement a more efficient shouldComponentUpdate.
   Now about the Context API, the big problem is its overusing, especially when it is used like a global state because it doesn't provide a selector, so every time a state changes in the context, all the components subscribed to it will rerender, even if the updated state is not using by the component. The best use for context is states that don't frequently are updated, like controlling the theme or languages. However, if your app is using a global state wrongly, causing performance issues, the best approach would be refactoring to a global management state library, like Redux, Recoil end, etc., or as the last option, refactoring to create several small contexts and wrapping its Provider where it is needed.

---

3. Describe 3 ways to pass information from a component to its PARENT.

- The Parent component can send to a child component a callback function, where the child calls this callback with parameters, and this information is updated back to the parent component. This is known as render props.

- The second one could be using forwardRef and useImperativeHandle. When the parent component adds a reference to its child component, using useRef, the child sends its reference using the forwardRef HOC, that way we can create methods with the useImperativeHandle, and the parent only needs to attach them to the ref created. For Example, let's assume a have a modal, all modals at least need a state to control when it should be open, so instead of creating all the states and functions on the parent, we can handle all of them in the child. The parent can use ref.current.open(), to open a Modal, for example.

- Another would be using the Context, where a parent component uses a state from the context, and the child updates this state. The same happens with redux and other libraries.

---

4. Give 2 ways to prevent components from re-rendering.

- One way is a PureComponent or use React.memo HOC, both of already was well explained in the first question.

- Another approach can be Composition, by breaking down complex components into smaller ones, reducing the chances of a complete rerender when only a specific part of the component needs to be updated. As well we can use memo, useMemo, and useCallbacks, when it needs to be used. We should never overuse those hooks, because it uses the browser memory and we can create more issues than solve problems.

---

5. What is a fragment and why do we need it? Give an example where it might
   break my app.
   => Basically, a fragment is a way to group multiple elements without adding an additional DOM node. Fragments are represented by the <React.Fragment> syntax or the shorthand <>. Long story short, by using a fragment, we can avoid unnecessary nesting and potential styling conflicts.
   Most of the time, fragments are very safe to be used, but it does not add a DOM node, only a virtual DOM container. However, in certain UI frameworks or components, the code might assume that its first child is a specific element. If a fragment is used as the immediate child, it may not behave as expected, potentially leading to issues with the applied styles.
   Example:

   **Issue with the Fragment**

```
const MyComponent = () => {
  return (
    <NavBar> // this component expect its children should be Li tag.
      <Fragment> // It should use Ul tag instead to prevent styles issues.
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </Fragment>
    </NavBar>
  );
};
```

---

6. Give 3 examples of the HOC pattern.
   => This pattern allows us to reuse component logic throughout our application, however nowadays custom Hooks can replace any HOC easily. Here follow the uses that I have used:

- withAuth:

```
const withAuth = (WrappedComponent) => {
  const isAuthenticated = true; // simple logic
  if (isAuthenticated) {
    return <WrappedComponent />;
  } else {
    return <LoginPage />;
  }
};

const ProfilePage = () => <div>Welcome to the profile page!</div>;
const AuthenticatedProfilePage = withAuth(ProfilePage);

```

- WithRouter:

```
export const withRouter = (Component) => {
  const displayName = `withRouter(${Component.displayName || Component.name})`;
  const ComponentWithRouterProp = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const match = useMatch(getRoutePath(location, params));

    return <Component {...props} router={{ location, navigate, params, match }} />;
  };
  return hoistNonReactStatic(ComponentWithRouterProp, Component);
}
```

- WithTheme:

```
const theme = {
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
};

const withTheme = (WrappedComponent) => {
  const ComponentWithTheme = (props) => {
    return <WrappedComponent {...props} theme={theme} />;
  };

  return ComponentWithTheme;
};
```

---

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

- Promises: Then and catch
  ex:

```asyncFunction()
  .then(result => {
    // Handle successful
  })
  .catch(error => {
    // Handle error
  });
```

- Async/Await: Try and catch block
  ex:

```
async function asyncFunction() {
  try {
    const result = await myAsyncFunction();
    // Handle successful
  } catch (error) {
    // Handle error
  }
}

```

- Callback: Checking Parameters
  ex:

```
myAsyncFunction((error, result) => {
  if (error) {
    // Handle error
  } else {
    // Handle successful
  }
});

```

---

8. How many arguments does setState take and why is it async.
   => 2 arguments for a class based component, an object with state to be updated and a callback function that executes after the state update is completed.

```
...
handleIncrement = () => {
    // Using setState to update the state with an object
    this.setState({ count: this.state.count + 1 }, () => {
      // callback function that executes after state is updated
      console.log(this.state.count);
    });
  };
...
```

It's async because React uses batching processes to update all setStates in a single rerender and optimize the rendering, that way it creates a queue and processes them later in a batched manner.

---

9. List the steps needed to migrate a Class to Function Component.

- Change the Class for function on the top of the component;
- Delete the constructor;
- Change the setState for useState/useReducer hook;
- Change the life cycle methods for useEffect hook:
  **ComponentDidMount**

  ```
  useEffect(()=>{
    fetchAPI...
  },[])	// Array of deps empty
  ```

  **ComponentDidUpdate**

  ```
  const[state,setState]= useState(false)

  useEffect(()=>{
    fetchAPI...
  },[state])	// Array of deps with dependency
  ```

  **ComponentWillUnmount**

  ```
  useEffect(() => {
    const handleWindowResize = (e) => {
      // Called when browser window is resized
    };

    window.addEventListener("resize", handleWindowResize);

    return () => { // The return is used to call a cleanup function
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  ```

- Change the bind functions to arrow functions;
- Change the getter to functions;
- Take all the props that are been used and add them as params of the functional component;
- Delete the render function and keep its logic;
- Keep the return method and change functions and states/props that were changed;
- DELETE all "this" keywords in the component.

---

10. List a few ways styles can be used with components.

- Inline styles;
- External stylesheet styles;
- CSS in JS (Styled-components/Emotion);
- Theming styles;
- Animation Styles;
- Global styles...

---

11. How to render an HTML string coming from the server.
    => We can use the dangerouslySetInnerHTML attribute. However, this attribute can expose your application to potential cross-site scripting (XSS) vulnerabilities if the HTML is not properly sanitized.
    Example:

    ```
    <div dangerouslySetInnerHTML={{__html: '<strong>strong text</strong>'}} />
    ```

    Another option is use some libraries like html-react-parser:

    ```
    import parser from 'html-react-parser';
    parse('<div>text</div>');
    ```
