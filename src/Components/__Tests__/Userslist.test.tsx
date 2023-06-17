

import {render, waitFor} from "@testing-library/react"
import UssersList from "../UssersList";


jest.mock('uuid', () => ({ v4: () => 'hjhj87878' }));


test('Input box to enter the todo List by user should be present', () => {

    const userlist = render(<UssersList/>)
   
    const inputBox = userlist.getByTestId("todolist-input")
   
    expect(inputBox).not.toBeInTheDocument()
   
 });


