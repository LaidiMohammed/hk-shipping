import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month") || new Date().toISOString().slice(0, 7);

  // In prod replace with Prisma: prisma.order.findMany({ where: { createdAt: { gte: start, lt: end } } })
  const mockOrders = [
    { code8: "HK7A9P2Q", client: "Amine Benali", phone: "0555123456", product: "Shoes Nike 50", qty: 50, unitPrice: 2800, finalPrice: 2800, status: "PENDING", wilaya: "Alger" },
    { code8: "HK3M8X1Z", client: "Youcef Khaled", phone: "0660123456", product: "Machine hydraulique", qty: 1, unitPrice: 450000, finalPrice: 470000, status: "PENDING", wilaya: "Oran" },
    { code8: "HK9B2K4L", client: "Sarah Meriem", phone: "0770123456", product: "Trousse maquillage", qty: 120, unitPrice: 1200, finalPrice: 1350, status: "VALIDATED", wilaya: "Sétif" },
  ];

  const totalRevenue = mockOrders.reduce((s, o) => s + o.qty * o.finalPrice, 0);

  // If ?format=excel, stream xlsx
  if (searchParams.get("format") === "excel") {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(`HK ${month}`);
    ws.addRow([`HK Shipping - Rapport ${month}`, `Revenu total: ${totalRevenue} DA`]);
    ws.addRow([]);
    ws.addRow(["Code8", "Client", "Téléphone", "Wilaya", "Produit", "Qté", "Prix unit", "Prix final", "Total", "Statut", "Date"]);
    ws.getRow(3).font = { bold: true };
    mockOrders.forEach(o => {
      ws.addRow([o.code8, o.client, o.phone, o.wilaya, o.product, o.qty, o.unitPrice, o.finalPrice, o.qty * o.finalPrice, o.status, new Date().toLocaleDateString()]);
    });
    ws.columns.forEach(c => { c.width = 16; });
    const buf = await wb.xlsx.writeBuffer();
    return new NextResponse(buf as any, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="HK-${month}.xlsx"`,
      },
    });
  }

  return NextResponse.json({ month, totalRevenue, orders: mockOrders, count: mockOrders.length });
}
