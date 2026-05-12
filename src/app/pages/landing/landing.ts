import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TopbarWidget } from './components/topbarwidget.component';
import { FooterWidget } from './components/footerwidget';
import { BuquedaVenta } from '../../components/buqueda-venta/buqueda-venta';
import { BuquedaAlquiler } from '../../components/buqueda-alquiler/buqueda-alquiler';
import { DetalleInmueble } from '../../components/detalle-inmueble/detalle-inmueble';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        TopbarWidget, 
        FooterWidget, 
        RippleModule, 
        StyleClassModule, 
        ButtonModule, 
        DividerModule,
        InputTextModule,
        BuquedaVenta,
        BuquedaAlquiler,
        DetalleInmueble
    ],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900 min-h-screen flex flex-col">
            <div id="home" class="landing-wrapper overflow-hidden flex flex-col flex-1">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                
                <!-- HERO (Solo en inicio) -->
                <div id="hero" class="flex flex-col items-center justify-center pt-28 pb-32 px-6 lg:px-20 overflow-hidden"
                     style="background: linear-gradient(135deg, #E6EE9C 0%, #ffffff 100%); border-bottom: 1px solid #dce775;" *ngIf="!buscando && !verDetalleActivo">
                    <h1 class="text-6xl md:text-7xl font-black text-[#1A262F] mb-4 text-center tracking-tighter" style="font-family: 'Inter', sans-serif;">
                        Tu hogar, <span class="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">a un clic.</span>
                    </h1>
                    <p class="text-xl text-[#1A262F]/80 mb-12 text-center max-w-2xl font-bold">
                        Encuentra la propiedad perfecta en la mejor zona de Zaragoza con la tecnología de TuPisoYa.
                    </p>
                    
                    <div class="bg-white/95 backdrop-blur-2xl p-4 rounded-3xl shadow-[0_30px_60px_rgba(26,38,47,0.15)] flex flex-col md:flex-row items-center gap-4 w-full max-w-5xl border border-white">
                        <!-- Toggle Options -->
                        <div class="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-14 w-full md:w-auto">
                            <button class="flex-1 px-8 h-full rounded-xl font-bold transition-all duration-300" 
                                    [ngClass]="{'text-white shadow-lg': operacion === 'comprar', 'text-slate-500 hover:text-slate-700': operacion !== 'comprar'}" 
                                    [style.background]="operacion === 'comprar' ? 'linear-gradient(135deg, #1A262F 0%, #2D3E4B 100%)' : 'transparent'"
                                    (click)="operacion = 'comprar'" style="min-width: 130px;">Comprar</button>
                            <button class="flex-1 px-8 h-full rounded-xl font-bold transition-all duration-300" 
                                    [ngClass]="{'text-white shadow-lg': operacion === 'alquilar', 'text-slate-500 hover:text-slate-700': operacion !== 'alquilar'}" 
                                    [style.background]="operacion === 'alquilar' ? 'linear-gradient(135deg, #1A262F 0%, #2D3E4B 100%)' : 'transparent'"
                                    (click)="operacion = 'alquilar'" style="min-width: 130px;">Alquilar</button>
                        </div>
                        
                        <div class="flex-1 flex flex-col md:flex-row gap-4 w-full">
                            <select [(ngModel)]="tipoSeleccionado" class="h-14 w-full md:w-48 border-none bg-slate-50 dark:bg-slate-800 text-[#1A262F] dark:text-white font-bold outline-none px-4 rounded-2xl focus:ring-2 focus:ring-[#E6EE9C] transition-all cursor-pointer">
                                <option *ngFor="let tipo of tiposInmueble" [value]="tipo.value">{{ tipo.label }}</option>
                            </select>
                            
                            <div class="relative flex-1 h-14 w-full bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center px-4 focus-within:ring-2 focus-within:ring-[#E6EE9C] transition-all">
                                <i class="pi pi-map-marker text-[#1A262F] mr-3"></i>
                                <input type="text" pInputText [(ngModel)]="terminoBusqueda" placeholder="Ciudad, barrio o código postal..." class="w-full h-full border-none shadow-none bg-transparent font-bold p-0 text-[#1A262F] dark:text-white" (keyup.enter)="ejecutarBusqueda()" />
                            </div>
                        </div>
                        
                        <button pButton pRipple label="Buscar" icon="pi pi-search" 
                                class="h-14 px-10 font-bold rounded-2xl shadow-xl border-none text-white hover:opacity-90 transition-all" 
                                style="background: linear-gradient(135deg, #1A262F 0%, #2D3E4B 100%);"
                                (click)="ejecutarBusqueda()"></button>
                    </div>
                </div>

                <!-- SECCIONES INFORMATIVAS (Solo en inicio) -->
                <div class="px-6 lg:px-20 py-12 space-y-20 bg-white dark:bg-surface-900" *ngIf="!buscando && !verDetalleActivo">
                    <!-- Sección 1: App -->
                    <div class="relative flex flex-col md:flex-row items-center">
                        <div class="w-full md:w-3/4 overflow-hidden rounded-xl shadow-lg">
                            <img src="/demo/images/galleria/landing1.jpg" alt="App TuPisoYa" class="w-full h-[400px] object-cover transition-transform hover:scale-105 duration-500">
                        </div>
                        <div class="w-full md:w-1/3 md:absolute md:right-0 bg-white dark:bg-surface-800 p-8 rounded-lg shadow-xl mt-[-40px] md:mt-0 z-10 border border-gray-100 dark:border-surface-700">
                            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lleva TuPisoYa siempre contigo</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Con nuestra app serás el primero en enterarte de nuevos inmuebles, cambios en tus favoritos y mensajes del chat.</p>
                            <div class="flex items-center gap-4 cursor-pointer" (click)="openAppModal()">
                                <div class="bg-gray-100 p-2 rounded"><i class="pi pi-qrcode text-5xl text-gray-800"></i></div>
                                <span class="text-sm text-gray-500 font-medium underline">Haz clic para descargar</span>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 2: Valoración -->
                    <div class="relative flex flex-col md:flex-row-reverse items-center">
                        <div class="w-full md:w-3/4 overflow-hidden rounded-xl shadow-lg">
                            <img src="/demo/images/galleria/landing2.png" alt="Valoración" class="w-full h-[400px] object-cover transition-transform hover:scale-105 duration-500">
                        </div>
                        <div class="w-full md:w-1/3 md:absolute md:left-0 bg-white dark:bg-surface-800 p-8 rounded-lg shadow-xl mt-[-40px] md:mt-0 z-10 border border-gray-100 dark:border-surface-700">
                            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">¿Cuánto vale tu casa?</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">Una valoración online gratuita en segundos:</p>
                            <ul class="space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                                <li class="flex items-start gap-2"><i class="pi pi-check-circle text-green-500 mt-1"></i> Rango de precio preciso</li>
                                <li class="flex items-start gap-2"><i class="pi pi-check-circle text-green-500 mt-1"></i> Evolución del mercado</li>
                                <li class="flex items-start gap-2"><i class="pi pi-check-circle text-green-500 mt-1"></i> Comparativa con similares</li>
                            </ul>
                            <a (click)="openValuationModal()" class="text-primary-600 font-bold hover:underline flex items-center gap-2 cursor-pointer">Valorar tu casa gratis <i class="pi pi-arrow-right"></i></a>
                        </div>
                    </div>

                    <!-- Sección 3: Casas Rurales -->
                    <div class="relative flex flex-col md:flex-row items-center">
                        <div class="w-full md:w-3/4 overflow-hidden rounded-xl shadow-lg">
                            <img src="/demo/images/galleria/landing3.jpg" alt="Escapada Rural" class="w-full h-[400px] object-cover transition-transform hover:scale-105 duration-500">
                        </div>
                        <div class="w-full md:w-1/3 md:absolute md:right-0 bg-white dark:bg-surface-800 p-8 rounded-lg shadow-xl mt-[-40px] md:mt-0 z-10 border border-gray-100 dark:border-surface-700">
                            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Escapadas para disfrutar</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-6">Todos queremos vacaciones y desconectar del día a día. ¿Te vas a resistir a una escapada rural? Tú eliges.</p>
                            <a href="#" class="text-primary-600 font-bold hover:underline flex items-center gap-2">Ver alquiler vacacional <i class="pi pi-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

                <!-- CONTENEDOR DE VISTAS DINÁMICAS (Resultados / Detalle) -->
                <div class="flex-1 bg-white dark:bg-surface-900 px-6 lg:px-20 py-8" *ngIf="buscando || verDetalleActivo">
                    <div class="max-w-7xl mx-auto">
                        
                        <!-- Header de Resultados -->
                        <div *ngIf="buscando && !verDetalleActivo" class="flex justify-between items-center mb-10 pb-6 border-b border-surface-100">
                            <h2 class="text-3xl font-black text-gray-900 dark:text-white m-0">Resultados de búsqueda</h2>
                            <button pButton icon="pi pi-times" label="Cerrar búsqueda" class="p-button-text p-button-secondary font-bold" (click)="cerrarBusqueda()"></button>
                        </div>

                        <!-- Header de Detalle -->
                        <div *ngIf="verDetalleActivo" class="mb-12">
                            <button pButton label="Volver a los resultados" 
                                    class="p-button-text p-button-plain font-black text-surface-400 hover:text-primary transition-all p-0 flex items-center gap-2 group" 
                                    (click)="volver()">
                                <i class="pi pi-arrow-left transition-transform group-hover:-translate-x-1"></i>
                                <span>Volver a los resultados</span>
                            </button>
                        </div>

                        <!-- Componentes -->
                        <app-buqueda-venta *ngIf="buscando && !verDetalleActivo && operacionActiva === 'comprar'" [terminoBusquedaInput]="terminoBusquedaActivo" (onInmuebleSelected)="mostrarDetalle($event)"></app-buqueda-venta>
                        <app-buqueda-alquiler *ngIf="buscando && !verDetalleActivo && operacionActiva === 'alquilar'" [terminoBusquedaInput]="terminoBusquedaActivo" (onInmuebleSelected)="mostrarDetalle($event)"></app-buqueda-alquiler>
                        <app-detalle-inmueble *ngIf="verDetalleActivo" [idInput]="detalleId" [tipoInput]="detalleTipo"></app-detalle-inmueble>
                    </div>
                </div>

                <footer-widget class="mt-auto" />
            </div>

            <!-- Modal de Valoración -->
            <div *ngIf="showValuationModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" (click)="closeValuationModal()"></div>
                <div class="bg-white dark:bg-surface-900 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative z-10">
                    <button (click)="closeValuationModal()" class="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors">
                        <i class="pi pi-times text-xl"></i>
                    </button>

                    <div class="p-8">
                        <div class="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
                            <div class="bg-gray-900 h-full transition-all duration-500" [style.width.%]="(valuationStep / 6) * 100"></div>
                        </div>

                        <div *ngIf="valuationStep === 1" class="space-y-6">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">¿Qué quieres valorar?</h2>
                            <div class="grid grid-cols-2 gap-4">
                                <button (click)="valuationData.tipo = 'piso'; nextValuationStep()" 
                                    class="p-8 border-2 border-gray-100 rounded-2xl hover:border-gray-900 hover:bg-lime-50 transition-all group">
                                    <i class="pi pi-building text-4xl mb-4 text-gray-400 group-hover:text-gray-900"></i>
                                    <span class="block font-bold text-xl">Piso</span>
                                </button>
                                <button (click)="valuationData.tipo = 'casa'; nextValuationStep()" 
                                    class="p-8 border-2 border-gray-100 rounded-2xl hover:border-gray-900 hover:bg-lime-50 transition-all group">
                                    <i class="pi pi-home text-4xl mb-4 text-gray-400 group-hover:text-gray-900"></i>
                                    <span class="block font-bold text-xl">Casa</span>
                                </button>
                            </div>
                        </div>

                        <div *ngIf="valuationStep === 2" class="space-y-6">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Detalles básicos</h2>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-bold mb-2 uppercase tracking-wide text-gray-500">Código Postal</label>
                                    <input type="text" [(ngModel)]="valuationData.cp" placeholder="Ej: 28001" 
                                           class="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-xl font-bold">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold mb-2 uppercase tracking-wide text-gray-500">Metros Cuadrados</label>
                                    <input type="number" [(ngModel)]="valuationData.m2" placeholder="Ej: 85" 
                                           class="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-900 outline-none text-xl font-bold">
                                </div>
                                <button (click)="nextValuationStep()" [disabled]="!valuationData.cp || !valuationData.m2"
                                    class="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all">Siguiente</button>
                            </div>
                        </div>

                        <div *ngIf="valuationStep === 3" class="space-y-6">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">¿Qué extras tiene?</h2>
                            <div class="grid grid-cols-1 gap-3">
                                <button *ngFor="let extra of ['ascensor', 'garaje', 'terraza']" (click)="valuationData[extra] = !valuationData[extra]" 
                                    [ngClass]="valuationData[extra] ? 'border-gray-900 bg-lime-50' : 'border-gray-100'"
                                    class="p-4 border-2 rounded-xl flex items-center gap-4 transition-all">
                                    <div class="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center" [class.bg-gray-900]="valuationData[extra]">
                                        <i class="pi pi-check text-white text-xs" *ngIf="valuationData[extra]"></i>
                                    </div>
                                    <span class="font-bold text-lg capitalize">{{extra}}</span>
                                </button>
                                <button (click)="nextValuationStep()" class="w-full py-4 bg-gray-900 text-white font-bold rounded-xl mt-4">Siguiente</button>
                            </div>
                        </div>

                        <div *ngIf="valuationStep === 4" class="space-y-6">
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Estado de la vivienda</h2>
                            <div class="space-y-4">
                                <button *ngFor="let est of ['Reformado', 'Buen estado', 'A reformar']" 
                                    (click)="valuationData.estado = est; nextValuationStep()"
                                    class="w-full p-6 border-2 border-gray-100 rounded-2xl text-left hover:border-gray-900 hover:bg-lime-50 transition-all flex justify-between items-center group">
                                    <span class="text-xl font-bold">{{est}}</span>
                                    <i class="pi pi-chevron-right text-gray-300 group-hover:text-gray-900 transition-colors"></i>
                                </button>
                            </div>
                        </div>

                        <div *ngIf="valuationStep === 6" class="text-center space-y-6">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 bg-primary-100">
                                <i class="pi pi-check text-2xl text-primary-700"></i>
                            </div>
                            <h2 class="text-3xl font-black text-surface-900 dark:text-white">Valoración Lista</h2>
                            
                            <div class="p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden bg-primary">
                                <div class="relative z-10">
                                    <p class="text-xs uppercase tracking-widest opacity-70 mb-1">Precio Estimado por TuPisoYa</p>
                                    <h3 class="text-5xl font-black mb-3 text-white">{{estimatedPrice | currency:'EUR':'symbol':'1.0-0'}}</h3>
                                    <div class="flex justify-between items-center bg-white/20 p-3 rounded-xl backdrop-blur-md">
                                        <div class="text-left">
                                            <p class="text-[10px] opacity-70 uppercase">Rango Sugerido</p>
                                            <p class="font-bold text-sm text-white">{{estimatedPrice * 0.95 | currency:'EUR':'symbol':'1.0-0'}} - {{estimatedPrice * 1.05 | currency:'EUR':'symbol':'1.0-0'}}</p>
                                        </div>
                                        <i class="pi pi-chart-line text-white"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="p-6 bg-surface-50 dark:bg-surface-800 rounded-2xl border border-surface-100 text-left relative">
                                <div class="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full flex items-center gap-2 shadow-sm">
                                    <i class="pi pi-sparkles text-[10px]"></i> ANÁLISIS DEL MOTOR INTELIGENTE
                                </div>
                                <p class="text-surface-700 dark:text-surface-300 text-sm italic leading-relaxed">
                                    "{{aiReasoning}}"
                                </p>
                            </div>

                            <div class="flex gap-4 pt-2">
                                <button pButton label="Cerrar" class="flex-1 py-4 p-button-secondary p-button-text font-bold" (click)="closeValuationModal()"></button>
                                <button pButton label="Contactar Agente" class="flex-1 py-4 font-bold rounded-xl shadow-lg" (click)="router.navigate(['/contacto'])"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal App -->
            <div *ngIf="showAppModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" (click)="closeAppModal()"></div>
                <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 p-8">
                    <button (click)="closeAppModal()" class="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><i class="pi pi-times text-xl"></i></button>
                    <h2 class="text-2xl font-bold mb-6">TuPisoYa en tu móvil</h2>
                    <div class="grid grid-cols-2 gap-8">
                        <div class="text-center p-4 border rounded-2xl bg-gray-50">
                            <h3 class="font-bold mb-4">Android</h3>
                            <img src="assets/demo/images/galleria/qr_playstore.png" class="w-32 h-32 mx-auto mb-4">
                            <button class="w-full py-2 bg-gray-900 text-white rounded-lg font-bold">Google Play</button>
                        </div>
                        <div class="text-center p-4 border rounded-2xl bg-gray-50">
                            <h3 class="font-bold mb-4">iOS</h3>
                            <img src="assets/demo/images/galleria/qr_appstore.png" class="w-32 h-32 mx-auto mb-4">
                            <button class="w-full py-2 bg-gray-900 text-white rounded-lg font-bold">App Store</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .landing-wrapper { scroll-behavior: smooth; }
    `]
})
export class Landing implements OnInit {
    operacion: string = 'comprar';
    tipoSeleccionado: string = 'piso';
    terminoBusqueda: string = '';
    tiposInmueble = [
        { label: 'Piso', value: 'piso' },
        { label: 'Casa', value: 'casa' },
        { label: 'Local', value: 'local' },
        { label: 'Oficina', value: 'oficina' }
    ];

    router = inject(Router);
    private route = inject(ActivatedRoute);
    
    buscando: boolean = false;
    operacionActiva: string = '';
    terminoBusquedaActivo: string = '';

    verDetalleActivo: boolean = false;
    detalleId: number | null = null;
    detalleTipo: 'venta' | 'alquiler' | null = null;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['detalle'] && params['tipo']) {
                this.detalleId = +params['detalle'];
                this.detalleTipo = params['tipo'] as any;
                this.verDetalleActivo = true;
                this.buscando = true;
            } else if (params['q'] && params['op']) {
                this.terminoBusquedaActivo = params['q'];
                this.operacionActiva = params['op'];
                this.buscando = true;
                this.verDetalleActivo = false;
            } else {
                this.buscando = false;
                this.verDetalleActivo = false;
            }
        });
    }

    ejecutarBusqueda() {
        if (this.terminoBusqueda.trim()) {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { q: this.terminoBusqueda, op: this.operacion, detalle: null, tipo: null },
                queryParamsHandling: 'merge'
            });
        }
    }

    cerrarBusqueda() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { q: null, op: null, detalle: null, tipo: null },
            queryParamsHandling: 'merge'
        });
    }

    mostrarDetalle(event: {id: number, tipo: 'venta' | 'alquiler'}) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { detalle: event.id, tipo: event.tipo },
            queryParamsHandling: 'merge'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    volver() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { detalle: null, tipo: null },
            queryParamsHandling: 'merge'
        });
    }
    
    showAppModal: boolean = false;
    showValuationModal: boolean = false;
    valuationStep: number = 1;
    valuationData: any = { tipo: '', cp: '', m2: null, ascensor: false, garaje: false, terraza: false, estado: '' };
    estimatedPrice: number = 0;
    aiReasoning: string = '';

    openValuationModal() { this.showValuationModal = true; this.valuationStep = 1; }
    closeValuationModal() { this.showValuationModal = false; }
    openAppModal() { this.showAppModal = true; }
    closeAppModal() { this.showAppModal = false; }

    nextValuationStep() {
        if (this.valuationStep < 4) this.valuationStep++;
        else { this.calculateValuationSmartLocal(); this.valuationStep = 6; }
    }

    calculateValuationSmartLocal() {
        const provincias: any = { '28': 'Madrid', '08': 'Barcelona', '46': 'Valencia', '41': 'Sevilla', '50': 'Zaragoza' };
        const prefijo = this.valuationData.cp.substring(0, 2);
        const provincia = provincias[prefijo] || 'tu zona';
        let multiplicadorZona = (prefijo === '28' || prefijo === '08') ? 1.45 : 1.0;
        const base = this.valuationData.tipo === 'piso' ? 2400 : 3100;
        let price = (this.valuationData.m2 || 80) * base * multiplicadorZona;
        if (this.valuationData.ascensor) price += 25000;
        if (this.valuationData.garaje) price += 15000;
        if (this.valuationData.terraza) price += 12000;
        if (this.valuationData.estado === 'Reformado') price *= 1.15;
        if (this.valuationData.estado === 'A reformar') price *= 0.85;
        this.estimatedPrice = price;
        this.aiReasoning = `Análisis para ${provincia}: La demanda de ${this.valuationData.tipo}s es alta. Tu inmueble (${this.valuationData.estado}) tiene un valor competitivo.`;
    }
}
