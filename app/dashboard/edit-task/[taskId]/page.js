import EditTaskForm from "@/components/editTask/EditTaskForm";

const page = ({ params }) => {
  const { taskId } = params;

  return (
    <div>
      <EditTaskForm taskId={taskId} />
    </div>
  );
};

export default page;
