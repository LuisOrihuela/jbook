import "bulmaswatch/superhero/bulmaswatch.min.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

//components
// import CodeCell from './components/code-cell'
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        {/* <CodeCell /> */}
        <TextEditor />
      </Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
