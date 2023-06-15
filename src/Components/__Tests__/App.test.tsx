
import {render} from "@testing-library/react"
import Todopage from "../Todopage";
import App from "../../App";

jest.mock('uuid', () => ({ v4: () => 'hjhj87878' }));


test('renders learn react link', () => {

 const app = render(<App/>)

 console.log(app)

});
