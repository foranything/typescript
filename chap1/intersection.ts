class Grid {
  Width = 0;
  Height = 0;
  padding: number;
}

class Margin {
  Left = 0;
  Top = 0;
  Width = 10;
  Height = 20;
  Padding?: number;
}

function ConsolidatedGrid(grid: Grid, margin: Margin): Grid & Margin {
  return {
    ...grid,
    ...margin,
    padding: margin.Padding || grid.padding,
  };
}
