import { getAuth } from "@clerk/react-router/ssr.server";
import { data } from "react-router";
import { eq } from "drizzle-orm";
import { Accounts, Transactions } from "~/lib/schema";
import { db } from "~/lib/db";
import { z } from "zod";
import { PassThrough } from "stream";
import PDFDocument from "pdfkit";
import fs, { createReadStream, createWriteStream } from "fs";

import type { Route } from "./+types/data";

const FORMAT_OPTIONS = z.enum(["json", "csv", "pdf"]);

function createPDF(
  account,
  transactions: { title: string; createdAt: Date }[]
) {
  const doc = new PDFDocument();

  // Embed a font, set the font size, and render some text
  doc
    .font("fonts/PalatinoBold.ttf")
    .fontSize(25)
    .text("Some text with an embedded font!", 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image("path/to/image.png", {
    fit: [250, 300],
    align: "center",
    valign: "center",
  });

  // Add another page
  doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  // Finalize PDF file
  doc.end();

  return doc;
}

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;
  const formData = await args.request.formData();
  // TODO: verify user

  const schema = z.object({ format: FORMAT_OPTIONS });
  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) return data(result.error, { status: 400 });

  try {
    const [account, transactions] = await Promise.allSettled([
      db.select().from(Accounts).where(eq(Accounts.id, id)),
      db
        .select()
        .from(Transactions)
        .where(eq(Transactions.accountId, id))
        .orderBy(Transactions.createdAt),
    ]);

    if (account.status === "rejected" || transactions.status === "rejected") {
      return data(null, { status: 500 });
    }

    // if (result.data.format === "pdf") {
    const doc = createPDF(account.value, transactions.value);
    // const stream = ();
    return new Response(doc, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="account-${id}.pdf"`,
      },
    });
    // }

    return data(null, { status: 400 });
  } catch (err) {
    return data(null, { status: 500 });
  }
}
