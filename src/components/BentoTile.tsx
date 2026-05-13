import type { ReferenceItem } from "../data/referenceData"
import "./BentoTile.css"

type BentoTileProps = {
  item: ReferenceItem
  onClick: () => void
  index: number
  gridArea?: string
}

export default function BentoTile({ item, onClick, index, gridArea }: BentoTileProps) {
  return (
    <div 
      className={`bento-tile ${item.size || ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.05}s` }}
      data-grid-area={gridArea}
    >
      <div className="tile-content">
        <h3 className="tile-title">{item.title}</h3>
        <div className={`tile-visual ${item.visualType}`}>
          {renderVisual(item.visualType)}
        </div>
      </div>
    </div>
  )
}

function renderVisual(type: string) {
  switch (type) {
    case "print":
      return (
        <div className="visual-print">
          <div className="print-bracket">(</div>
          <div className="print-text">"..."</div>
          <div className="print-bracket">)</div>
        </div>
      )
    
    case "variable":
      return (
        <div className="visual-variable">
          <div className="var-name">x</div>
          <div className="var-equals">=</div>
          <div className="var-value">42</div>
        </div>
      )
    
    case "operators":
      return (
        <div className="visual-operators">
          <div className="operator">+</div>
          <div className="operator">-</div>
          <div className="operator">*</div>
          <div className="operator">/</div>
        </div>
      )
    
    case "complex-ops":
      return (
        <div className="visual-complex-ops">
          <div className="complex-op">//</div>
          <div className="complex-op">%</div>
          <div className="complex-op">**</div>
        </div>
      )
    
    case "math":
      return (
        <div className="visual-math">
          <div className="math-symbol">π</div>
          <div className="math-func">√</div>
        </div>
      )
    
    case "if":
      return (
        <div className="visual-if">
          <div className="if-keyword">if</div>
          <div className="if-condition">?</div>
          <div className="if-arrow">→</div>
        </div>
      )
    
    case "for":
      return (
        <div className="visual-for">
          <div className="for-loop">↻</div>
          <div className="for-range">1..n</div>
        </div>
      )
    
    case "while":
      return (
        <div className="visual-while">
          <div className="while-loop">⟲</div>
          <div className="while-condition">⊤</div>
        </div>
      )
    
    case "conversion":
      return (
        <div className="visual-conversion">
          <div className="conv-from">str</div>
          <div className="conv-arrow">→</div>
          <div className="conv-to">int</div>
        </div>
      )
    
    case "list":
      return (
        <div className="visual-list">
          <div className="list-bracket">[</div>
          <div className="list-items">
            <div className="list-item"></div>
            <div className="list-item"></div>
            <div className="list-item"></div>
          </div>
          <div className="list-bracket">]</div>
        </div>
      )
    
    case "dict":
      return (
        <div className="visual-dict">
          <div className="dict-bracket">{"{"}</div>
          <div className="dict-pair">
            <div className="dict-key"></div>
            <div className="dict-colon">:</div>
            <div className="dict-value"></div>
          </div>
          <div className="dict-bracket">{"}"}</div>
        </div>
      )
    
    case "tuple":
      return (
        <div className="visual-tuple">
          <div className="tuple-bracket">(</div>
          <div className="tuple-items">
            <div className="tuple-item"></div>
            <div className="tuple-item"></div>
          </div>
          <div className="tuple-bracket">)</div>
        </div>
      )
    
    case "function":
      return (
        <div className="visual-function">
          <div className="func-def">def</div>
          <div className="func-name">f</div>
          <div className="func-parens">()</div>
        </div>
      )
    
    case "file":
      return (
        <div className="visual-file">
          <div className="file-icon">
            <div className="file-fold"></div>
            <div className="file-body"></div>
          </div>
        </div>
      )
    
    case "error":
      return (
        <div className="visual-error">
          <div className="error-symbol">!</div>
          <div className="error-text">Error</div>
        </div>
      )
    
    case "matplotlib":
      return (
        <div className="visual-matplotlib">
          <div className="plot-line"></div>
          <div className="plot-axis-x"></div>
          <div className="plot-axis-y"></div>
        </div>
      )
    
    default:
      return null
  }
}