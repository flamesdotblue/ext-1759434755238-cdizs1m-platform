import { useState } from 'react';

export default function DataEditor({ onAddTeacher, onAddStudent, onAddClass }) {
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 'teacher' && teacherName.trim()) {
      onAddTeacher(teacherName);
      setTeacherName('');
    }
    if (type === 'student' && studentName.trim()) {
      onAddStudent(studentName);
      setStudentName('');
    }
    if (type === 'class' && className.trim()) {
      onAddClass(className);
      setClassName('');
    }
  };

  return (
    <div className="space-y-6">
      <Panel title="Add Teacher">
        <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="flex items-center gap-2">
          <input
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="e.g., Ada Lovelace"
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40"
          />
          <button className="px-4 py-2 rounded-md bg-emerald-400 text-slate-900 font-medium hover:bg-emerald-300 transition">
            Add
          </button>
        </form>
      </Panel>

      <Panel title="Add Student">
        <form onSubmit={(e) => handleSubmit(e, 'student')} className="flex items-center gap-2">
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g., Grace Hopper"
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40"
          />
          <button className="px-4 py-2 rounded-md bg-emerald-400 text-slate-900 font-medium hover:bg-emerald-300 transition">
            Add
          </button>
        </form>
      </Panel>

      <Panel title="Create Class">
        <form onSubmit={(e) => handleSubmit(e, 'class')} className="flex items-center gap-2">
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="e.g., Intro to Algorithms"
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/40"
          />
          <button className="px-4 py-2 rounded-md bg-emerald-400 text-slate-900 font-medium hover:bg-emerald-300 transition">
            Create
          </button>
        </form>
      </Panel>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-black/20">
      <h3 className="text-sm font-semibold text-slate-200 mb-3 tracking-wide">{title}</h3>
      {children}
    </div>
  );
}
