package com.partyhub.PartyHub.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] mainBanner;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] secondaryBanner;
    private String location;
    private String city;
    private float lng;
    private float lat;
    private LocalDate date;
    private String details;
    private float price;
    private int discount;
    private int ticketsNumber;
    private int ticketsLeft = this.ticketsNumber;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "statistics_id", referencedColumnName = "id") // This column will store the FK to Statistics
    private Statistics statistics;
    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets;
    @OneToMany(mappedBy = "event")
    private List<DiscountForNextTicket> discountsForNextTicket;
}
