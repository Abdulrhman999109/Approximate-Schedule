export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-8">

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Approximate Schedule</h1>
          <p className="text-lg text-gray-600">
            The ultimate task management system designed to keep you organized and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition p-6 border-l-4 border-green-500">
            <h5 className="text-xl font-semibold mb-2">Task Management</h5>
            <p className="text-gray-600">
              Efficiently create, update, and manage your tasks with our simple interface.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition p-6 border-l-4 border-yellow-500">
            <h5 className="text-xl font-semibold mb-2">Priority System</h5>
            <p className="text-gray-600">
              Categorize tasks by priority: Low, Medium, or High, and visualize your workload.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition p-6 border-l-4 border-red-500">
            <h5 className="text-xl font-semibold mb-2">User-Friendly Design</h5>
            <p className="text-gray-600">
              Enjoy a clean, intuitive interface that makes task management easier than ever.
            </p>
          </div>
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Why Choose Approximate Schedule?</h2>
          <p className="text-gray-700 mb-6">
            Approximate Schedule is designed with simplicity and efficiency in mind, helping you stay on top of
            your tasks and improve your productivity.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Easy task creation and editing</li>
            <li>Visual priority system to manage workloads</li>
            <li>Responsive design for any device</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
