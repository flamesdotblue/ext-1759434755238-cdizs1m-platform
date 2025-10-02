import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import DataEditor from './components/DataEditor';
import Assignments from './components/Assignments';
import DataTable from './components/DataTable';

const STORAGE_KEY = 'school-tracker-v1';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function App() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setTeachers(parsed.teachers || []);
        setStudents(parsed.students || []);
        setClasses(parsed.classes || []);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const payload = { teachers, students, classes };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore
    }
  }, [teachers, students, classes]);

  const addTeacher = (name) => {
    const t = { id: uid(), name: name.trim() };
    setTeachers((prev) => [...prev, t]);
  };
  const addStudent = (name) => {
    const s = { id: uid(), name: name.trim() };
    setStudents((prev) => [...prev, s]);
  };
  const addClass = (name) => {
    const c = { id: uid(), name: name.trim(), teacherIds: [], studentIds: [] };
    setClasses((prev) => [...prev, c]);
  };

  const assignTeacherToClass = (teacherId, classId) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id !== classId) return c;
        if (c.teacherIds.includes(teacherId)) return c;
        return { ...c, teacherIds: [...c.teacherIds, teacherId] };
      })
    );
  };

  const removeTeacherFromClass = (teacherId, classId) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, teacherIds: c.teacherIds.filter((id) => id !== teacherId) } : c))
    );
  };

  const assignStudentToClass = (studentId, classId) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id !== classId) return c;
        if (c.studentIds.includes(studentId)) return c;
        return { ...c, studentIds: [...c.studentIds, studentId] };
      })
    );
  };

  const removeStudentFromClass = (studentId, classId) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, studentIds: c.studentIds.filter((id) => id !== studentId) } : c))
    );
  };

  const derived = useMemo(() => {
    const teacherMap = new Map(teachers.map((t) => [t.id, t]));
    const studentMap = new Map(students.map((s) => [s.id, s]));
    const classesEnriched = classes.map((c) => ({
      ...c,
      teachers: c.teacherIds.map((id) => teacherMap.get(id)).filter(Boolean),
      students: c.studentIds.map((id) => studentMap.get(id)).filter(Boolean),
    }));
    return { teacherMap, studentMap, classesEnriched };
  }, [teachers, students, classes]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DataEditor onAddTeacher={addTeacher} onAddStudent={addStudent} onAddClass={addClass} />
          </div>
          <div className="lg:col-span-2">
            <Assignments
              teachers={teachers}
              students={students}
              classes={classes}
              onAssignTeacher={assignTeacherToClass}
              onRemoveTeacher={removeTeacherFromClass}
              onAssignStudent={assignStudentToClass}
              onRemoveStudent={removeStudentFromClass}
            />
          </div>
        </section>

        <section className="mt-8">
          <DataTable teachers={teachers} students={students} classesEnriched={derived.classesEnriched} />
        </section>
      </main>

      <footer className="mt-16 py-10 text-center text-sm text-slate-400">
        Built for tracking classes, teachers, and students.
      </footer>
    </div>
  );
}
