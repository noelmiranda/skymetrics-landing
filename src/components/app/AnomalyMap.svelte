<script lang="ts">
  import type { SolarPanel, ThermalAnomaly } from '../../lib/api/types.js';

  interface Props {
    panels: SolarPanel[];
    anomalies: ThermalAnomaly[];
  }

  let { panels, anomalies }: Props = $props();

  let mapEl = $state<HTMLDivElement | null>(null);

  const SEVERITY_COLOR: Record<ThermalAnomaly['severity'], string> = {
    low:      '#8CBDB9',
    medium:   '#E09E50',
    critical: '#ef4444',
  };

  $effect(() => {
    if (!mapEl || panels.length === 0) return;

    let map: import('leaflet').Map | undefined;

    import('leaflet').then((L) => {
      const leaflet = L.default ?? L;

      const center = panels.reduce(
        (acc, p) => [acc[0] + p.location.latitude, acc[1] + p.location.longitude],
        [0, 0] as [number, number],
      ).map((v) => v / panels.length) as [number, number];

      map = leaflet.map(mapEl!, { zoomControl: true }).setView(center, 18);

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 22,
      }).addTo(map);

      const anomalyByPanel = new Map(anomalies.map((a) => [a.panelId, a]));

      for (const panel of panels) {
        const anomaly = anomalyByPanel.get(panel.id);
        const color = anomaly ? SEVERITY_COLOR[anomaly.severity] : '#2D3E4E';

        const marker = leaflet.circleMarker(
          [panel.location.latitude, panel.location.longitude],
          { radius: 8, fillColor: color, color: '#fff', weight: 2, fillOpacity: 0.9 },
        ).addTo(map!);

        const popupContent = anomaly
          ? `<strong>${panel.identifierCode}</strong><br/>
             Fault: ${anomaly.faultType}<br/>
             Severity: ${anomaly.severity}<br/>
             ΔT: ${anomaly.temperatureDelta.toFixed(1)} °C`
          : `<strong>${panel.identifierCode}</strong><br/>No anomaly detected`;

        marker.bindPopup(popupContent);
      }
    });

    return () => { map?.remove(); };
  });
</script>

<div bind:this={mapEl} class="w-full h-full rounded-xl overflow-hidden" aria-label="Anomaly map"></div>
