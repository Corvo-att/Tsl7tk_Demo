import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ProviderRecord,
  SparePartRecord,
  VehicleRecord,
  MaintenanceItem,
  FuelEntry,
  CustomerRequest,
  RequestStatus,
  NotificationItem,
} from '../data/types';
import {
  INITIAL_PROVIDERS,
  INITIAL_PARTS,
  INITIAL_VEHICLES,
  INITIAL_MAINTENANCE,
  INITIAL_FUEL_ENTRIES,
  INITIAL_REQUESTS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppState {
  providers: ProviderRecord[];
  parts: SparePartRecord[];
  vehicles: VehicleRecord[];
  activeVehicleId: string;
  maintenance: MaintenanceItem[];
  fuelEntries: FuelEntry[];
  requests: CustomerRequest[];
  notifications: NotificationItem[];
  favoriteProviderIds: string[];

  setActiveVehicle: (id: string) => void;
  addVehicle: (v: Omit<VehicleRecord, 'id'>) => void;
  addFuelEntry: (entry: { odometerKm: number; liters: number; costEgp: number }) => void;
  createRequest: (req: Omit<CustomerRequest, 'id' | 'status' | 'createdAtLabel'>) => string;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  submitReview: (requestId: string, providerId: string, rating: number, commentText: string) => void;
  toggleFavoriteProvider: (providerId: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      providers: INITIAL_PROVIDERS,
      parts: INITIAL_PARTS,
      vehicles: INITIAL_VEHICLES,
      activeVehicleId: INITIAL_VEHICLES[0].id,
      maintenance: INITIAL_MAINTENANCE,
      fuelEntries: INITIAL_FUEL_ENTRIES,
      requests: INITIAL_REQUESTS,
      notifications: INITIAL_NOTIFICATIONS,
      favoriteProviderIds: ['prov-1'],

      setActiveVehicle: (id) => set({ activeVehicleId: id }),

      addVehicle: (v) =>
        set((state) => {
          const newVeh: VehicleRecord = { ...v, id: `veh-${Date.now()}` };
          return {
            vehicles: [...state.vehicles, newVeh],
            activeVehicleId: newVeh.id,
          };
        }),

      addFuelEntry: ({ odometerKm, liters, costEgp }) =>
        set((state) => {
          const vehicleEntries = state.fuelEntries
            .filter((e) => e.vehicleId === state.activeVehicleId)
            .sort((a, b) => a.odometerKm - b.odometerKm);

          const lastEntry = vehicleEntries[vehicleEntries.length - 1];
          let consumptionLPer100Km: number | undefined;
          if (lastEntry && odometerKm > lastEntry.odometerKm) {
            const dist = odometerKm - lastEntry.odometerKm;
            consumptionLPer100Km = Number(((liters / dist) * 100).toFixed(1));
          }

          const newEntry: FuelEntry = {
            id: `fuel-${Date.now()}`,
            vehicleId: state.activeVehicleId,
            date: new Date().toISOString().slice(0, 10),
            odometerKm,
            liters,
            costEgp,
            consumptionLPer100Km,
          };

          const updatedVehicles = state.vehicles.map((v) =>
            v.id === state.activeVehicleId && odometerKm > v.mileageKm
              ? { ...v, mileageKm: odometerKm }
              : v
          );

          return {
            fuelEntries: [...state.fuelEntries, newEntry],
            vehicles: updatedVehicles,
          };
        }),

      createRequest: (req) => {
        const id = `req-${Date.now()}`;
        const newReq: CustomerRequest = {
          ...req,
          id,
          status: 'pending',
          createdAtLabel: { en: 'Just now', ar: 'الآن' },
        };

        set((state) => ({
          requests: [newReq, ...state.requests],
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: {
                en: 'Request Sent — Pending Provider Confirmation',
                ar: 'تم إرسال الطلب — بانتظار تأكيد مقدم الخدمة',
              },
              body: req.title,
              minutesAgo: 1,
              read: false,
              linkTo: '/requests',
            },
            ...state.notifications,
          ],
        }));

        // Simulated provider auto-acceptance after 7 seconds
        setTimeout(() => {
          const current = get().requests.find((r) => r.id === id);
          if (current && current.status === 'pending') {
            get().updateRequestStatus(id, 'accepted');
          }
        }, 7000);

        return id;
      },

      updateRequestStatus: (id, status) =>
        set((state) => {
          const target = state.requests.find((r) => r.id === id);
          const updated = state.requests.map((r) =>
            r.id === id ? { ...r, status } : r
          );

          const statusNotif: NotificationItem | null = target
            ? {
                id: `notif-${Date.now()}`,
                title:
                  status === 'accepted'
                    ? {
                        en: 'Provider Accepted Your Request!',
                        ar: 'وافق مقدم الخدمة على طلبك!',
                      }
                    : status === 'completed'
                      ? {
                          en: 'Request Completed — Leave a Verified Review',
                          ar: 'اكتمل الطلب — يمكنك الآن إضافة تقييم موثق',
                        }
                      : {
                          en: 'Request Status Updated',
                          ar: 'تم تحديث حالة الطلب',
                        },
                body: target.title,
                minutesAgo: 1,
                read: false,
                linkTo: '/requests',
              }
            : null;

          return {
            requests: updated,
            notifications: statusNotif
              ? [statusNotif, ...state.notifications]
              : state.notifications,
          };
        }),

      submitReview: (requestId, providerId, rating, commentText) =>
        set((state) => {
          const updatedRequests = state.requests.map((r) =>
            r.id === requestId ? { ...r, reviewed: true } : r
          );

          const updatedProviders = state.providers.map((p) => {
            if (p.id !== providerId) return p;
            const newReview = {
              id: `rev-${Date.now()}`,
              authorName: 'Khaled Ashraf (You)',
              rating,
              date: new Date().toISOString().slice(0, 10),
              comment: { en: commentText, ar: commentText },
              verifiedRequestLabel: {
                en: 'Verified • Completed via tsl7tk',
                ar: 'طلب مكتمل موثق عبر tsl7tk',
              },
            };
            const newCount = p.reviewCount + 1;
            const newRating = Number(
              ((p.rating * p.reviewCount + rating) / newCount).toFixed(1)
            );
            return {
              ...p,
              rating: newRating,
              reviewCount: newCount,
              reviews: [newReview, ...p.reviews],
            };
          });

          return {
            requests: updatedRequests,
            providers: updatedProviders,
          };
        }),

      toggleFavoriteProvider: (providerId) =>
        set((state) => {
          const exists = state.favoriteProviderIds.includes(providerId);
          return {
            favoriteProviderIds: exists
              ? state.favoriteProviderIds.filter((id) => id !== providerId)
              : [...state.favoriteProviderIds, providerId],
          };
        }),

      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      resetDemoData: () =>
        set({
          providers: INITIAL_PROVIDERS,
          parts: INITIAL_PARTS,
          vehicles: INITIAL_VEHICLES,
          activeVehicleId: INITIAL_VEHICLES[0].id,
          maintenance: INITIAL_MAINTENANCE,
          fuelEntries: INITIAL_FUEL_ENTRIES,
          requests: INITIAL_REQUESTS,
          notifications: INITIAL_NOTIFICATIONS,
          favoriteProviderIds: ['prov-1'],
        }),
    }),
    {
      name: 'tsl7tk_demo_store_v1',
    }
  )
);

