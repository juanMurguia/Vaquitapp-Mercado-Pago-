import Image from "next/image";
import styles from "./page.module.scss";
import { getConfirmedPayments } from "@/lib/purchases";
import { getCampaign } from "@/lib/campaign";
import Link from "next/link";

export default async function Home() {
  //const confirmed = (await getConfirmedPayments()) || [];
  //console.log(confirmed);
  //const totalDonations = confirmed.reduce((a, b) => a + b.amount, 0);
  const campaign = getCampaign();
  const donationsGoal = campaign.amount;
  //const progressPercent = Math.round((totalDonations / donationsGoal) * 100);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Campaña no encontrada</h1>
      </div>
    </div>
  );
}
