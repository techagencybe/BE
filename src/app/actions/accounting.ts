"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTransactions(month: number, year: number) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await (db as any).transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: "desc" },
    });

    return { success: true, transactions };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Failed to fetch transactions" };
  }
}

export async function addTransaction(data: {
  type: "REVENUE" | "EXPENSE";
  amount: number;
  description: string;
  externalFunding?: number;
  date?: string;
}) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const transaction = await (db as any).transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        externalFunding: data.externalFunding || 0,
        isRepaid: false,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    revalidatePath("/admin/accounting");
    return { success: true, transaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error: "Failed to add transaction" };
  }
}

export async function toggleRepayment(id: string, isRepaid: boolean) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await (db as any).transaction.update({
      where: { id },
      data: { isRepaid },
    });

    revalidatePath("/admin/accounting");
    return { success: true };
  } catch (error) {
    console.error("Error toggling repayment:", error);
    return { success: false, error: "Failed to update repayment status" };
  }
}

export async function deleteTransaction(id: string) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await (db as any).transaction.delete({
      where: { id },
    });

    revalidatePath("/admin/accounting");
    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: "Failed to delete transaction" };
  }
}

export async function getAccountingStats(month: number, year: number) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await (db as any).transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    let revenue = 0;
    let expenses = 0;
    let totalExternalFunding = 0;
    let totalPendingRepayments = 0;

    transactions.forEach((t: any) => {
      if (t.type === "REVENUE") revenue += t.amount;
      else if (t.type === "EXPENSE") {
        expenses += t.amount;
        if (t.externalFunding > 0) {
          totalExternalFunding += t.externalFunding;
          if (!t.isRepaid) {
            totalPendingRepayments += t.externalFunding;
          }
        }
      }
    });

    const profit = revenue - expenses;

    return {
      success: true,
      stats: {
        revenue,
        expenses,
        profit,
        totalExternalFunding,
        totalPendingRepayments,
      },
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { success: false, error: "Failed to fetch accounting stats" };
  }
}
