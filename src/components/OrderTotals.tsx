import { useCallback } from 'react';
import type { OrderItem } from '../types/index';
import { formatCurrency } from '../helpers/index';

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void,
};

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
  // const subtotalAmount = useMemo(() => order.reduce((total, item) => total + item.price * item.quantity, 0), [order]);
  // const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);
  // const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);

  // useMEMO vs useCALLBACK, Funcionan igual en este caso, solo cambia la sintaxis
  const subtotalAmount = useCallback(() => order.reduce((total, item) => total + item.price * item.quantity, 0), [order]);
  const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order]);
  const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip, order]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-4xl">Totales y Propina</h2>

        <p className="text-2xl my-5">
          Subtotal a pagar: {""}
          {/* <span className="font-bold">{formatCurrency(subtotalAmount)}</span> */}
          {/* De esta forma sería si ejecutamos useCallback */}
          <span className="font-bold">{formatCurrency(subtotalAmount())}</span>
        </p>

        <p className="text-2xl my-5">
          Propina: {""}
          {/* <span className="font-bold">{formatCurrency(tipAmount)}</span> */}
          <span className="font-bold">{formatCurrency(tipAmount())}</span>
        </p>

        <p className="text-2xl my-5">
          Total a pagar: {""}
          {/* <span className="font-bold">{formatCurrency(totalAmount)}</span> */}
          <span className="font-bold">{formatCurrency(totalAmount())}</span>
        </p>
      </div>

      <button
        className="w-full bg-black p-3 text-white font-bold mt-10 cursor-pointer disabled:opacity-10 disabled:cursor-default"
        disabled={totalAmount() === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  );
};