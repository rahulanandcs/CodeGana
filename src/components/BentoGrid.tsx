import BentoTile from "./BentoTile"
import type { ReferenceItem } from "../data/referenceData"
import "./BentoGrid.css"

type BentoGridProps = {
  items: ReferenceItem[]
  onTileClick: (item: ReferenceItem) => void
  currentIndex: number
}

export default function BentoGrid({ items, onTileClick, currentIndex }: BentoGridProps) {
  return (
    <div className="bento-grid" key={currentIndex}>
      {items.map((item, index) => (
        <BentoTile
          key={item.id}
          item={item}
          onClick={() => onTileClick(item)}
          index={index}
          gridArea={item.gridArea}
        />
      ))}
    </div>
  )
}