import { firestore } from "./firebase";

type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};

export async function getConfirmedPayments(): Promise<Purchase[]> {
  try {
    const snapshot = await firestore
      .collection("Purchases")
      .where("status", "==", "confirmed")
      .get();
    const purchases: Purchase[] = [];

    snapshot.forEach((doc) => {
      purchases.push({ id: doc.id, ...doc.data() } as Purchase);
    });

    return purchases;
  } catch (error) {
    console.error("Error fetching confirmed payments:", error);
    return [
      {
        id: "1",
        from: "Pepito",
        amount: 33000,
        message: "Ahi te va mi aporte",
        date: new Date(),
        status: "confirmed",
      },
    ];
  }
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const purchase = {
    ...newPurchInput,
    date: new Date(),
    status: "pending",
  };
  // Guardar la nueva purchase en Firestore
  const purchaseRef = firestore.collection("Purchases").doc();
  await purchaseRef.set(purchase);

  // Devolver el ID del documento
  return purchaseRef.id;
}

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
  try {
    const purchaseRef = firestore.collection("Purchases").doc(purchaseId);
    await purchaseRef.update({ status: "confirmed" });
    console.log(`Purchase ${purchaseId} confirmed`);
    return true;
  } catch (error) {
    console.error(`Error confirming purchase ${purchaseId}:`, error);
    return false;
  }
}
