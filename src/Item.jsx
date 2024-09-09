/* eslint-disable react/prop-types */
function Item({ nombre, compra, inputValue }) {
  return (
    <div className="grid grid-flow-col auto-cols-fr">
      <div className="text-white">{nombre}</div>
      {inputValue && (
        <div className="text-white font-bold justify-self-center">
          $
          {(
            parseFloat(compra.toString().replace(/,/g, ".")) *
            parseFloat(inputValue.replace(/,/g, "."))
          ).toFixed(2)}
        </div>
      )}
      <div className="text-white font-bold justify-self-end">
        ${parseFloat(compra.toString().replace(/,/g, ".")).toFixed(2)}
      </div>
    </div>
  );
}

export default Item;
