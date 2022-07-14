function List() {
    return (
        <section className="section-list">
            <h1>What needs to be done?</h1>
            <div className="tasks-input-container">
                <input type="text" className="todo-input" placeholder="Write your tasks here" />
                <img src="https://i.ibb.co/z73gj7m/add-create-cross-new-plus-icon-163222-removebg-preview.png" alt="add-icon" />
            </div>
            <div className="view-options-container">
                <input type="radio" id="view-options1"
                    name="view-options" value="viewAll" />
                <label for="contactChoice1">View All</label>
                <input type="radio" id="view-options2"
                    name="view-options" value="To-do" />
                <label for="contactChoice2">To-do</label>
                <input type="radio" id="view-options3"
                    name="view-options" value="Completed" />
                <label for="contactChoice3">Completed</label>
            </div>
        </section>
    );
}

export default List;