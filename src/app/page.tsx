export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Medison
        </h1>
        <p className="text-center text-lg mb-4">
          Your Medical Communication Assistant
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">For Patients</h2>
            <p>Get help understanding medical terms and preparing for doctor visits</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">For Doctors</h2>
            <p>Tools to help explain medical concepts clearly to patients</p>
          </div>
        </div>
      </div>
    </main>
  )
} 