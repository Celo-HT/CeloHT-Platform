import React, { useEffect, useState } from "react";
import { StatsCard } from "../components/StatsCard";

interface Stats {
  users: number;
  transactions: number;
  activeWallets: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ users:0, transactions:0, activeWallets:0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/users/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <StatsCard title="Users" value={stats.users} />
      <StatsCard title="Transactions" value={stats.transactions} />
      <StatsCard title="Active Wallets" value={stats.activeWallets} />
    </div>
  );
};