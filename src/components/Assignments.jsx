import { useMemo, useState } from 'react';

export default function Assignments({ teachers, students, classes, onAssignTeacher, onRemoveTeacher, onAssignStudent, onRemoveStudent }) {
  const [selectedClassForTeachers, setSelectedClassForTeachers] = useState(classes[0]?.id || '');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassForStudents, setSelectedClassForStudents] = useState(classes[0]?.id || '');
  const [selectedStudent, setSelectedStudent] = useState('');

  const classMap = useMemo(() => new Map(classes.map((c) => [c.id, c])), [classes]);

  const assignedTeachers = useMemo(() => {
    const c = classMap.get(selectedClassForTeachers);
    if (!c) return [];
    return c.teacherIds.map((id) => teachers.find((t) => t.id === id)).filter(Boolean);
  }, [classMap, selectedClassForTeachers, teachers]);

  const assignedStudents = useMemo(() => {
    const c = classMap.get(selectedClassForStudents);
    if (!c) return [];
    return c.studentIds.map((id) => students.find((s) => s.id === id)).filter(Boolean);
  }, [classMap, selectedClassForStudents, students]);

  const handleAssignTeacher = (e) => {
    e.preventDefault();
    if (!selectedClassForTeachers || !selectedTeacher) return;
    onAssignTeacher(selectedTeacher, selectedClassForTeachers);
    setSelectedTeacher('');
  };

  const handleAssignStudent = (e) => {
    e.preventDefault();
    if (!selectedClassForStudents || !selectedStudent) return;
    onAssignStudent(selectedStudent, selectedClassForStudents);
    setSelectedStudent('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel title="Assign teachers to a class">
        <form onSubmit={handleAssignTeacher} className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedClassForTeachers}
            onChange={(e) => setSelectedClassForTeachers(e.target.value)}
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400/40"
          >
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400/40"
          >
            <option value="">Select teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button className="px-4 py-2 rounded-md bg-indigo-400 text-slate-900 font-medium hover:bg-indigo-300 transition">
            Assign
          </button>
        </form>

        <ul className="mt-4 divide-y divide-slate-800/80">
          {assignedTeachers.length === 0 && (
            <li className="py-3 text-sm text-slate-400">No teachers assigned.</li>
          )}
          {assignedTeachers.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <span>{t.name}</span>
              <button
                onClick={() => onRemoveTeacher(t.id, selectedClassForTeachers)}
                className="text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Assign students to a class">
        <form onSubmit={handleAssignStudent} className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedClassForStudents}
            onChange={(e) => setSelectedClassForStudents(e.target.value)}
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 focus:border-fuchsia-400/40"
          >
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="flex-1 rounded-md bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40 focus:border-fuchsia-400/40"
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button className="px-4 py-2 rounded-md bg-fuchsia-400 text-slate-900 font-medium hover:bg-fuchsia-300 transition">
            Assign
          </button>
        </form>

        <ul className="mt-4 divide-y divide-slate-800/80">
          {assignedStudents.length === 0 && (
            <li className="py-3 text-sm text-slate-400">No students assigned.</li>
          )}
          {assignedStudents.map((s) => (
            <li key={s.id} className="flex items-center justify-between py-3">
              <span>{s.name}</span>
              <button
                onClick={() => onRemoveStudent(s.id, selectedClassForStudents)}
                className="text-sm px-3 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-black/20 h-full">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
