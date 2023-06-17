
import {render, waitFor} from "@testing-library/react"
import Todopage from "../Todopage";

jest.mock('uuid', () => ({ v4: () => 'hjhj87878' }));


test('todolist Logo should be present',  () => {

    const todopage = render(<Todopage/>)
   
    const Logo = todopage.getByTestId("todo-logo")
   
    expect(Logo).toBeInTheDocument()
   
 });


test('todolist header should be present',  () => {

 const todopage = render(<Todopage/>)

 const headerText = todopage.getByTestId("todo-header")

 expect(headerText).toBeInTheDocument()

});
