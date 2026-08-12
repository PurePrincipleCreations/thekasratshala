import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { cartAtom, isCartOpenAtom } from "@/lib/store";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useAtom(isCartOpenAtom);
  const [cart, setCart] = useAtom(cartAtom);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:max-w-md bg-[var(--night)] z-[110] border-l border-[var(--bone)] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[var(--gold)]" />
                <h2 className="editorial-heading text-3xl">Your Cart</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[var(--bone)] transition-colors rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="label-caps">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-[var(--bone)] pb-6">
                    <div className="space-y-1">
                      <p className="editorial-heading text-xl">{item.name}</p>
                      <p className="label-caps text-[10px] text-[var(--gold)]">₹{item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--muted)] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-auto pt-8 border-t border-[var(--bone)] space-y-6">
                <div className="flex justify-between items-center">
                  <p className="label-caps text-[var(--muted)]">Total</p>
                  <p className="editorial-heading text-3xl text-[var(--gold)]">₹{total.toLocaleString()}</p>
                </div>
                <Button 
                  className="w-full h-16 bg-[var(--teal)] text-[var(--night)] hover:bg-[var(--gold)] text-lg label-caps"
                  onClick={() => alert("Checkout not implemented in this demo")}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
