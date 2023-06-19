

import {fireEvent, render, waitFor} from "@testing-library/react"
import UssersList from "../UssersList";


jest.mock('uuid', () => ({ v4: () => ['hjhj8787','hjhj8788','hjhj8789'] }));


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json :() => Promise.resolve ({
        "id": "chatcmpl-7SMrEJW6Y8LDGw7ehrCJydKN7ft1z",
        "object": "chat.completion",
        "created": 1686995404,
        "model": "gpt-3.5-turbo-0301",
        "usage": {
            "prompt_tokens": 19,
            "completion_tokens": 576,
            "total_tokens": 595
        },
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": "Meeting at 5 pm - Tips and Strategies\n\nMeetings play an essential role in every organization. They serve as a platform for communication, collaboration, and decision-making. While meetings are beneficial, they can also be time-consuming and unproductive if not handled properly. One of the most challenging meeting times is 5 pm since it's the end of the workday, and many people are eager to leave and go home. Here are some tips and strategies to make your 5 pm meeting more efficient and productive.\n\n1. Stick to the Agenda\n\nHaving a well-organized agenda is crucial for any meeting, and it's especially essential for a 5 pm meeting since people are more inclined to lose their focus at this time. Make sure you have a clear purpose and idea for the meeting. It will help if you prepare an outline of what you want to discuss, including any pertinent information you need to share. Share the meeting agenda with all participants before the meeting, so they come prepared. Sticking to the agenda will keep the meeting on track, ensuring it ends on time.\n\n2. Be Mindful of Time\n\nTime management is crucial when it comes to 5 pm meetings. Be respectful of everyone's time and start and end the meeting on time. If attendees are continuously late, consider sending an email reminder or a calendar invite. Since it's the end of the day, some people may need to leave early, so make sure the meeting's duration is clear from the start to prevent any conflict.\n\n3. Make It Interesting and Interactive\n\nPeople tend to be tired at the end of the day, so making the meeting interactive and engaging can help keep their attention. Use different techniques such as visuals, group discussions, and team-building activities to make it more interesting. This strategy will help make the meeting more productive and fun, leading to better participation and engagement.\n\n4. Recognize Achievements\n\nCelebrate team achievements and progress during the meeting. Reflect on what was successful and what needs improvement on your project or team. Highlight those accomplishments and celebrate team members for their hard work. This strategy helps boost morale and promotes team collaboration and engagement.\n\n5. Wrap Up with Clear Action Points\n\nEnsure all meetings wrap up with clear action items. Go over each person's responsibility in the project or team, and make sure everyone understands what they need to do. This strategy helps set expectations and keeps everyone accountable. Follow up with everyone after the meeting and provide feedback to keep everyone on track towards their goals.\n\nConclusion\n\nMeeting at 5 pm can be a challenge, but with the right strategies and techniques, it can be productive and valuable. Stick to the agenda, be mindful of time, make it interesting and interactive, recognize achievements, and wrap up with clear action points. Taking these steps will help ensure that the meeting is productive, engaging, and beneficial for everyone involved."
                },
                "finish_reason": "stop",
                "index": 0
            }
        ]
    } )
    })
}) as jest.Mock


test('Input box to enter the todo List by user should be present', () => {

    const userlist = render(<UssersList/>)
   
    const inputBox = userlist.getByTestId("todolist-input")
   
    expect(inputBox).toBeInTheDocument()
   
 });

 test("Task and Article should be created once user enters todolist" , () => {
    const userlist = render(<UssersList/>)

    const inputBox = userlist.getByTestId("todolist-input")

    const taskButton = userlist.getByTestId("addtask-button")

    fireEvent.change(inputBox, {target : { value :"meeting at 5pm"}})

    fireEvent.click(taskButton)

    const tasklist = userlist.getByTestId("user-todolist")

    expect(tasklist.children.length).toBe(2)

    const articlelist = userlist.getByTestId("articlelist")

    expect(articlelist.children.length).toBe(1)
 })


 test("when user clicks on completed button, it should strike out the todolist" , () => {

    const userlist = render(<UssersList/>)

    const inputBox = userlist.getByTestId("todolist-input")

    const taskButton = userlist.getByTestId("addtask-button")

    fireEvent.change(inputBox, {target : { value :"meeting at 5pm"}})

    fireEvent.click(taskButton)

    const completeButton = userlist.getByTestId("todo-tick")

    const listname = userlist.getByTestId("todolistname")

    expect(listname.classList.contains("strikestyle")).toBe(false)

    fireEvent.click(completeButton)

    expect(listname.classList.contains("strikestyle")).toBe(true)
    
 })

 test("when user clicks on edit button, todolist should be edited" , () => {

    const userlist = render(<UssersList/>)

    const inputBox = userlist.getByTestId("todolist-input")

    const taskButton = userlist.getByTestId("addtask-button")

    fireEvent.change(inputBox, {target : { value :"meeting at 5pm"}})

    fireEvent.click(taskButton)

    const editButton = userlist.getByTestId("todo-edit")

    const listname = userlist.getByTestId("todolistname")

    expect(listname.innerHTML).toBe("meeting at 5pm")

    fireEvent.click(editButton)

    const editBox = userlist.getByTestId("todo-editbox")

    fireEvent.change(editBox, {target : { value :"Learn node js"}})

    const okButton = userlist.getByTestId("edit-ok")

    fireEvent.click(okButton)
 
    const listname1 = userlist.getByTestId("todolistname")

    expect(listname1.innerHTML).toBe("Learn node js")

   
 })

 test("when user clicks on delete button, todolist should be deleted" , () => {

    const userlist = render(<UssersList/>)

    const inputBox = userlist.getByTestId("todolist-input")

    const taskButton = userlist.getByTestId("addtask-button")

    fireEvent.change(inputBox, {target : { value :"meeting at 5pm"}})

    fireEvent.click(taskButton)

    const deleteButton = userlist.getByTestId("todo-delete")

    const listname = userlist.getByTestId("todolistname")

    expect(listname.innerHTML).toBe("meeting at 5pm")

    fireEvent.click(deleteButton)

    expect(listname).not.toBeInTheDocument()

 })


 
 test("User should be able to select more rows.  Multiple selected rows should be deleted at once using the 'Delete Selected' button" , () => {

    const userlist = render(<UssersList/>)

    const inputBox = userlist.getByTestId("todolist-input")

    const taskButton = userlist.getByTestId("addtask-button")

    fireEvent.change(inputBox, {target : { value :"meeting at 5pm"}})

    fireEvent.click(taskButton)

    fireEvent.change(inputBox, {target : { value :"Learn node js"}})

    fireEvent.click(taskButton)

    fireEvent.change(inputBox, {target : { value :"DSA"}})

    fireEvent.click(taskButton)

    const tasklist = userlist.getByTestId("user-todolist")

    const listItem0 = userlist.getByTestId("list0")

    fireEvent.click(listItem0)

    const listItem1 = userlist.getByTestId("list1")

    fireEvent.click(listItem1)

    const multipleDelete = userlist.getByTestId("multipleDelete")
   
    fireEvent.click(multipleDelete)

   expect(tasklist.children.length).toBe(2)

 })
