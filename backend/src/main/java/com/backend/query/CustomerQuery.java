package com.backend.query;

public class CustomerQuery {

    public static final String STATS_QUERY ="select c.total_customers, i.total_invoices, inv.total_billed from(select count(*) total_customers from customer) c, (select count(*) total_invoices from invoices) i, (select round(SUM(total)) total_billed from invoice) inv";
}
