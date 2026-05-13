"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mergeIntoCustomerPortfolio } from "@/lib/crm/customer-csv";
import { customers as seedCustomers } from "@/lib/crm/mock-data";
import type { CustomerPortfolio } from "@/lib/crm/types";

/** Bump when seed data shape/count changes so browsers pick up new demo rows. */
const STORAGE_KEY = "crm-customers-v2";

function loadStored(): CustomerPortfolio[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed as CustomerPortfolio[];
  } catch {
    return null;
  }
}

function persist(list: CustomerPortfolio[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function nextNr(list: CustomerPortfolio[]): number {
  let max = 0;
  for (const c of list) {
    if (typeof c.nr === "number" && c.nr > max) {
      max = c.nr;
    }
  }
  return max + 1;
}

type CustomersContextValue = {
  customers: CustomerPortfolio[];
  addCustomer: (partial: Partial<CustomerPortfolio>) => CustomerPortfolio;
  importCustomers: (
    partials: Partial<CustomerPortfolio>[],
  ) => { added: number; skipped: number };
};

const CustomersContext = createContext<CustomersContextValue | null>(null);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] =
    useState<CustomerPortfolio[]>(seedCustomers);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = loadStored();
      if (stored && stored.length > 0) {
        setCustomers(stored);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persist(customers);
  }, [customers, hydrated]);

  const addCustomer = useCallback((partial: Partial<CustomerPortfolio>) => {
    let created!: CustomerPortfolio;
    setCustomers((prev) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `c-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const nr = nextNr(prev);
      created = mergeIntoCustomerPortfolio(partial, id, nr);
      return [...prev, created];
    });
    return created;
  }, []);

  const importCustomers = useCallback(
    (partials: Partial<CustomerPortfolio>[]) => {
      let added = 0;
      let skipped = 0;
      setCustomers((prev) => {
        const next = [...prev];
        for (const p of partials) {
          if (!String(p.companyName ?? "").trim()) {
            skipped++;
            continue;
          }
          const id =
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `c-${Date.now()}-${Math.random().toString(36).slice(2)}`;
          const nr = nextNr(next);
          next.push(mergeIntoCustomerPortfolio(p, id, nr));
          added++;
        }
        return next;
      });
      return { added, skipped };
    },
    [],
  );

  const value = useMemo(
    () => ({
      customers,
      addCustomer,
      importCustomers,
    }),
    [customers, addCustomer, importCustomers],
  );

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers(): CustomersContextValue {
  const ctx = useContext(CustomersContext);
  if (!ctx) {
    throw new Error("useCustomers must be used within CustomersProvider");
  }
  return ctx;
}
