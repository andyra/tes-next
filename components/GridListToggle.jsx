import Button from "@/components/Button";

const GridListToggle = ({ gridView, setGridView }) => {
  return (
    <div className="flex items-center rounded-full border-2 hidden">
      <Button
        className="-my-2 -ml-2"
        onClick={() => {
          setGridView(true);
        }}
        size="sm"
        variant={gridView ? "glass" : "ghost"}
      >
        Grid
      </Button>
      <Button
        className="-my-2 -mr-2"
        onClick={() => {
          setGridView(false);
        }}
        size="sm"
        variant={gridView ? "ghost" : "glass"}
      >
        List
      </Button>
    </div>
  );
};

export default GridListToggle;
