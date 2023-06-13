
import {render} from "@testing-library/react"
import Todopage from "./Components/Todopage";

jest.mock('uuid', () => ({ v4: () => 'hjhj87878' }));


test('renders learn react link', () => {

 const app = render(<Todopage/>)

});
