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
                <div id="hero" class="hero-section flex flex-col items-center justify-center pt-32 pb-40 px-6 lg:px-20 overflow-hidden" *ngIf="!buscando && !verDetalleActivo">
                    <div class="hero-bg-overlay"></div>
                    <div class="hero-glow-1"></div>
                    <div class="hero-glow-2"></div>
                    
                    <h1 class="hero-title text-6xl md:text-8xl font-black text-[#1A262F] mb-6 text-center tracking-tighter relative z-10">
                        Tu hogar, <span class="text-[#D4E157] drop-shadow-[0_4px_12px_rgba(212,225,87,0.3)]">a un clic.</span>
                    </h1>
                    <p class="hero-subtitle text-xl md:text-2xl text-[#1A262F]/70 mb-14 text-center max-w-3xl font-bold relative z-10">
                        Encuentra la propiedad perfecta en Zaragoza con la tecnología inteligente de TuPisoYa.
                    </p>
                    
                    <div class="search-container-premium bg-white/60 backdrop-blur-3xl p-5 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(26,38,47,0.2),0_0_0_1px_rgba(212,225,87,0.3)] flex flex-col md:flex-row items-center gap-4 w-full max-w-6xl border border-white/80 relative z-10">
                        <!-- Toggle Options -->
                        <div class="toggle-group-premium flex items-center bg-gray-900/5 p-1.5 rounded-3xl h-16 w-full md:w-auto">
                            <button class="toggle-btn-premium flex-1 px-10 h-full rounded-[1.25rem] font-black transition-all duration-500" 
                                    [ngClass]="{'active': operacion === 'comprar'}" 
                                    (click)="operacion = 'comprar'">Comprar</button>
                            <button class="toggle-btn-premium flex-1 px-10 h-full rounded-[1.25rem] font-black transition-all duration-500" 
                                    [ngClass]="{'active': operacion === 'alquilar'}" 
                                    (click)="operacion = 'alquilar'">Alquilar</button>
                        </div>
                        
                        <div class="inputs-row-premium flex-1 flex flex-col md:flex-row gap-4 w-full">
                            <div class="custom-select-wrap flex-1">
                                <select [(ngModel)]="tipoSeleccionado" class="premium-input h-16 w-full font-bold outline-none px-6 rounded-3xl appearance-none cursor-pointer">
                                    <option *ngFor="let tipo of tiposInmueble" [value]="tipo.value">{{ tipo.label }}</option>
                                </select>
                            </div>
                            
                            <div class="search-input-wrap flex-[2] relative h-16 w-full bg-white/40 rounded-3xl flex items-center px-6 border-2 border-transparent focus-within:border-[#1A262F]/10 transition-all">
                                <i class="pi pi-map-marker text-[#1A262F] mr-4 text-xl"></i>
                                <input type="text" pInputText [(ngModel)]="terminoBusqueda" placeholder="Ciudad, barrio o código postal..." class="w-full h-full border-none shadow-none bg-transparent font-black p-0 text-[#1A262F]" (keyup.enter)="ejecutarBusqueda()" />
                            </div>
                        </div>
                        
                        <button pRipple (click)="ejecutarBusqueda()" class="btn-search-premium h-16 px-12 font-black rounded-3xl text-white shadow-2xl flex items-center gap-3">
                            <i class="pi pi-search text-xl"></i>
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>

                <!-- SECCIONES INFORMATIVAS (Solo en inicio) -->
                <div class="px-6 lg:px-20 py-24 space-y-32 bg-white dark:bg-surface-900" *ngIf="!buscando && !verDetalleActivo">
                    <!-- Sección 1: App -->
                    <div class="info-section relative flex flex-col md:flex-row items-center gap-12">
                        <div class="image-wrap-premium w-full md:w-3/5 overflow-hidden rounded-[3rem] shadow-2xl">
                            <img src="/demo/images/galleria/landing1.jpg" alt="App TuPisoYa" class="w-full h-[500px] object-cover transition-transform hover:scale-105 duration-1000">
                        </div>
                        <div class="content-card-premium w-full md:w-2/5 bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
                            <div class="section-tag mb-6">APLICACIÓN MÓVIL</div>
                            <h3 class="text-4xl font-black mb-6 text-gray-900 leading-tight">Lleva TuPisoYa siempre contigo</h3>
                            <p class="text-lg text-gray-500 mb-8 leading-relaxed font-medium">Con nuestra app serás el primero en enterarte de nuevos inmuebles, cambios en tus favoritos y mensajes del chat.</p>
                            <div class="flex items-center gap-6 cursor-pointer group" (click)="openAppModal()">
                                <div class="qr-btn-premium p-4 rounded-2xl bg-gray-900 transition-all group-hover:scale-110"><i class="pi pi-qrcode text-4xl text-[#D4E157]"></i></div>
                                <div class="flex flex-col">
                                    <span class="text-gray-900 font-black text-lg">Descarga Gratuita</span>
                                    <span class="text-gray-400 font-bold underline">Escanea para empezar</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 2: Valoración -->
                    <div class="info-section relative flex flex-col md:flex-row-reverse items-center gap-12">
                        <div class="image-wrap-premium w-full md:w-3/5 overflow-hidden rounded-[3rem] shadow-2xl">
                            <img src="/demo/images/galleria/landing2.png" alt="Valoración" class="w-full h-[500px] object-cover transition-transform hover:scale-105 duration-1000">
                        </div>
                        <div class="content-card-premium w-full md:w-2/5 bg-white/80 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
                            <div class="section-tag mb-6 color-lime">VALORACIÓN INTELIGENTE</div>
                            <h3 class="text-4xl font-black mb-6 text-gray-900 leading-tight">¿Cuánto vale tu casa realmente?</h3>
                            <p class="text-lg text-gray-500 mb-6 font-medium">Obtén una valoración online precisa en segundos gracias a nuestra IA:</p>
                            <ul class="space-y-4 mb-10">
                                <li class="flex items-center gap-3 font-bold text-gray-700"><i class="pi pi-check-circle text-[#D4E157] text-xl"></i> Rango de precio preciso</li>
                                <li class="flex items-center gap-3 font-bold text-gray-700"><i class="pi pi-check-circle text-[#D4E157] text-xl"></i> Evolución real del mercado</li>
                                <li class="flex items-center gap-3 font-bold text-gray-700"><i class="pi pi-check-circle text-[#D4E157] text-xl"></i> Comparativa avanzada</li>
                            </ul>
                            <a (click)="openValuationModal()" class="btn-action-premium inline-flex items-center gap-3 cursor-pointer">
                                <span>Valorar mi casa gratis</span>
                                <i class="pi pi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- CONTENEDOR DE VISTAS DINÁMICAS (Resultados / Detalle) -->
                <div class="flex-1 bg-white dark:bg-surface-900 px-6 lg:px-20 py-12" *ngIf="buscando || verDetalleActivo">
                    <div class="max-w-7xl mx-auto">
                        
                        <!-- Header de Resultados -->
                        <div *ngIf="buscando && !verDetalleActivo" class="results-container-header flex justify-between items-end mb-12 pb-8 border-b border-gray-100">
                            <div class="header-titles">
                                <p class="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Búsqueda activa</p>
                                <h2 class="text-5xl font-black text-gray-900 m-0 tracking-tighter">Resultados encontrados</h2>
                            </div>
                            <button pButton icon="pi pi-times" label="Cerrar búsqueda" class="btn-close-premium" (click)="cerrarBusqueda()"></button>
                        </div>

                        <!-- Header de Detalle -->
                        <div *ngIf="verDetalleActivo" class="mb-12">
                            <button class="back-btn-premium group" (click)="volver()">
                                <div class="back-icon-wrap">
                                    <i class="pi pi-arrow-left"></i>
                                </div>
                                <span>Volver a los resultados</span>
                            </button>
                        </div>

                        <!-- Componentes -->
                        <app-buqueda-venta *ngIf="buscando && !verDetalleActivo && operacionActiva === 'comprar'" [terminoBusquedaInput]="terminoBusquedaActivo" (onInmuebleSelected)="mostrarDetalle($event)"></app-buqueda-venta>
                        <app-detalle-inmueble *ngIf="verDetalleActivo" [idInput]="detalleId" [tipoInput]="detalleTipo"></app-detalle-inmueble>
                        <app-buqueda-alquiler *ngIf="buscando && !verDetalleActivo && operacionActiva === 'alquilar'" [terminoBusquedaInput]="terminoBusquedaActivo" (onInmuebleSelected)="mostrarDetalle($event)"></app-buqueda-alquiler>
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
                            <img src="/demo/images/galleria/qr_playstore.png" class="w-32 h-32 mx-auto mb-4">
                            <button class="w-full py-2 bg-gray-900 text-white rounded-lg font-bold">Google Play</button>
                        </div>
                        <div class="text-center p-4 border rounded-2xl bg-gray-50">
                            <h3 class="font-bold mb-4">iOS</h3>
                            <img src="/demo/images/galleria/qr_appstore.png" class="w-32 h-32 mx-auto mb-4">
                            <button class="w-full py-2 bg-gray-900 text-white rounded-lg font-bold">App Store</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .landing-wrapper { scroll-behavior: smooth; }
        
        /* Hero Styles - Inspirado en el perfil */
        .hero-section {
            position: relative;
            background: linear-gradient(135deg, #D4E157 0%, #A3C92A 50%, #84B01E 100%);
            border-bottom: 1px solid rgba(212, 225, 87, 0.3);
        }

        .hero-bg-overlay {
            position: absolute;
            top: -20%;
            right: -10%;
            width: 60%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            filter: blur(100px);
            z-index: 0;
        }

        .hero-glow-1 {
            position: absolute;
            bottom: -30%;
            left: -10%;
            width: 50%;
            height: 80%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
            filter: blur(80px);
            z-index: 0;
        }

        .hero-glow-2 {
            position: absolute;
            top: 10%;
            left: 30%;
            width: 40%;
            height: 60%;
            background: radial-gradient(circle, rgba(26,38,47,0.05) 0%, transparent 70%);
            filter: blur(60px);
            z-index: 0;
        }

        .hero-title {
            font-family: 'Inter', sans-serif;
            line-height: 0.9;
        }

        /* Search Container Premium */
        .toggle-btn-premium {
            color: #64748b;
            &:hover { color: #1A262F; }
            &.active {
                background: linear-gradient(135deg, #1A262F 0%, #2D3E4B 100%);
                color: #fff;
                box-shadow: 0 10px 20px rgba(26, 38, 47, 0.2);
            }
        }

        .premium-input {
            background: rgba(255, 255, 255, 0.4);
            border: 2px solid transparent;
            color: #1A262F;
            transition: all 0.3s ease;
            &:focus {
                background: #fff;
                border-color: #D4E157;
                box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
        }

        .btn-search-premium {
            background: linear-gradient(135deg, #1A262F 0%, #2D3E4B 100%);
            border: none;
            transition: all 0.3s ease;
            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 20px 40px rgba(26, 38, 47, 0.3);
            }
        }

        /* Info Sections */
        .section-tag {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.2em;
            color: #1A262F;
            background: #f1f5f9;
            padding: 0.5rem 1.25rem;
            border-radius: 999px;
            &.color-lime { background: #f1f9b8; color: #828a2c; }
        }

        .btn-action-premium {
            background: #1A262F;
            color: #D4E157;
            padding: 1rem 2rem;
            border-radius: 1.25rem;
            font-weight: 900;
            transition: all 0.3s ease;
            &:hover {
                transform: translateX(5px);
                box-shadow: 0 15px 30px rgba(26, 38, 47, 0.2);
            }
        }

        /* Nav & Headers */
        .btn-close-premium {
            background: #f1f5f9 !important;
            border: none !important;
            color: #64748b !important;
            font-weight: 800 !important;
            border-radius: 1rem !important;
            padding: 0.75rem 1.5rem !important;
            &:hover { background: #e2e8f0 !important; color: #1A262F !important; }
        }

        .back-btn-premium {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #94a3b8;
            font-weight: 800;
            transition: all 0.3s ease;

            .back-icon-wrap {
                width: 3.5rem;
                height: 3.5rem;
                background: #f8fafc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                i { font-size: 1.25rem; }
            }

            &:hover {
                color: #1A262F;
                .back-icon-wrap {
                    background: #1A262F;
                    color: #D4E157;
                    transform: translateX(-5px);
                }
            }
        }
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
