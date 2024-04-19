from datetime import datetime
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
users = {}
class ToDoItem:
    def __init__(self, description):
        self.description = description
        self.completed = False
        self.created_at = datetime.now()
        self.completed_at = None
    
    def mark_complete(self):
        self.completed = True
        self.completed_at = datetime.now()
    
    def mark_incomplete(self):
        self.completed = False
        self.completed_at = None

class ToDoList:
    def __init__(self, username):
        self.username = username
        self.pending_tasks = []
        self.completed_tasks = []
    
    def add_task(self, description):
        task = ToDoItem(description)
        self.pending_tasks.append(task)
    
    def mark_task_complete(self, task_index):
        task = self.pending_tasks.pop(task_index)
        task.mark_complete()
        self.completed_tasks.append(task)
    
    def mark_task_incomplete(self, task_index):
        task = self.completed_tasks.pop(task_index)
        task.mark_incomplete()
        self.pending_tasks.append(task)
    
    def delete_task(self, task_index, list_type):
        if list_type == "pending":
            self.pending_tasks.pop(task_index)
        elif list_type == "completed":
            self.completed_tasks.pop(task_index)
    
    def edit_task(self, task_index, new_description, list_type):
        if list_type == "pending":
            self.pending_tasks[task_index].description = new_description
        elif list_type == "completed":
            self.completed_tasks[task_index].description = new_description

todo_list = ToDoList('username')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_task', methods=['POST'])
def add_task():
    task_description = request.form['task_description']
    username = request.form.get('username')
    #todo_list.add_task(task_description)
    #return jsonify({'success': True})

    if username is not users:
        users[username] = ToDoList(username)
    users[username].add_task(task_description)
    return jsonify({'success': True})

@app.route('/mark_complete', methods=['POST'])
def mark_complete():
    task_index = int(request.form['task_index'])
    username = request.form.get('username')
    if username in users:
        users[username].mark_complete(task_index)
    #todo_list.mark_task_complete(task_index)
    return jsonify({'success': True})

@app.route('/mark_incomplete', methods=['POST'])
def mark_incomplete():
    task_index = int(request.form['task_index'])
    username = request.form.get('username')
    if username in users:
        users[username].mark_incomplete(task_index)
    #todo_list.mark_task_incomplete(task_index)
    return jsonify({'success': True})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    task_index = int(request.form['task_index'])
    list_type = request.form['list_type']
    username = request.form.get('username')
    if username in users:
        users[username].delete_task(task_index, list_type)
    #todo_list.delete_task(task_index, list_type)
    return jsonify({'success': True})

@app.route('/edit_task', methods=['POST'])
def edit_task():
    task_index = int(request.form['task_index'])
    new_description = request.form['new_description']
    list_type = request.form['list_type']
    username = request.form.get('username')
    if username in users:
        users[username].edit_task(task_index, new_description, list_type)

    #todo_list.edit_task(task_index, new_description, list_type)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run()