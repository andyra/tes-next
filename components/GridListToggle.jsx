import cn from "classnames";
import Button from "components/Button";

const GridListToggle = ({ gridView, setGridView }) => {
  // const classes = cn(
  //   "inline-flex items-center justify-center gap-4 rounded-full whitespace-nowrap text-ellipsis overflow-hidden transition",
  //   "focus:outline-none focus:ring-2 focus:ring-primary-10",
  //   "h-40 text-lg px-16",
  // );

  return (
    <div className="flex items-center gap-4 rounded-full border-2 p-2 hover:border-primary transition">
      <Button
        size="sm"
        onClick={() => {
          setGridView(!gridView);
        }}
        variant={gridView ? "glass" : "ghost"}
      >
        Grid
      </Button>
      <Button
        size="sm"
        onClick={() => {
          setGridView(!gridView);
        }}
        variant={gridView ? "ghost" : "glass"}
      >
        List
      </Button>
    </div>
  );
};

export default GridListToggle;
