
import {render, waitFor} from "@testing-library/react"
import Todopage from "../Todopage";

jest.mock('uuid', () => ({ v4: () => 'hjhj87878' }));


test('renders learn react link', async () => {

 const app = render(<Todopage/>)

 await waitFor(() => expect(app.getByTestId("todo-header")) )

 const headerText = app.getByTestId("todo-header")

 expect(headerText).toBeInTheDocument()

});
